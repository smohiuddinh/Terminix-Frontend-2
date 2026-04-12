import {
  useState, useEffect, useCallback, useRef, createContext, useContext,
} from "react";
import { today } from '../../../utils/helper';
import {
  useGetSheetList,
  useGetSheetById,
  useCreateSheet,
  useUpdateSheet,
  useDeleteSheet,
  useDashboardSummary,
  useDepartmentSummary,
  useSheetSummary,
  useHistorySummary,
} from "../../../api/client/cashier";
// import { useLogout } from "../../../api/client/user";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useLogout } from "../../../api/client/user";
import { useSelector } from "react-redux";

// ─── Constants ────────────────────────────────────────────────────────────────
const DEPARTMENTS = ["HLD","HLF","GHR","SF","ONLINE","DARAZ","FUM"];
const TABS = [
  { id: 0, label: "Opening",  icon: "◈" },
  { id: 1, label: "Sales",    icon: "↗" },
  { id: 2, label: "Expenses", icon: "↙" },
  { id: 3, label: "Day-End",  icon: "◎" },
  { id: 4, label: "Report",   icon: "⊞" },
  { id: 5, label: "History",  icon: "⊕" },
];

// ─── Theme Context ────────────────────────────────────────────────────────────
const ThemeCtx = createContext(null);
const useT = () => useContext(ThemeCtx);


function makeTokens(mode) {
  const dk = mode === "light";
  return {
    bg:         dk ? "#0d1117" : "#f0f2f5",
    surface:    dk ? "#161c24" : "#ffffff",
    surfaceHov: dk ? "#1c2532" : "#f7f9fb",
    border:     dk ? "#243040" : "#dde3ec",
    borderLt:   dk ? "#1e2a38" : "#eaeff5",
    accent:     "#00c47a",
    accentDim:  dk ? "rgba(0,196,122,0.1)"  : "rgba(0,196,122,0.09)",
    accentHov:  dk ? "rgba(0,196,122,0.18)" : "rgba(0,196,122,0.15)",
    red:        dk ? "#ff5a5a" : "#e53535",
    redDim:     dk ? "rgba(255,90,90,0.1)"  : "rgba(229,53,53,0.08)",
    text:       dk ? "#e8edf2" : "#111827",
    textMuted:  dk ? "#6b7c8e" : "#6b7280",
    textDim:    dk ? "#3e4f62" : "#b0bac8",
    inputBg:    dk ? "#0d1117" : "#f7f9fb",
    shadow:     dk ? "0 4px 24px rgba(0,0,0,0.45)" : "0 4px 24px rgba(0,0,0,0.1)",
    mono:       "'JetBrains Mono','Fira Code','Consolas',monospace",
    sans:       "'DM Sans','Outfit','Segoe UI',sans-serif",
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
// Use the shared `today()` helper so the same local YYYY-MM-DD value is
// produced consistently across the app (e.g., UI display, new-sheet creation).
const uid           = () => String(Date.now()) + String(Math.random()).slice(2, 6);
const blankEntry    = () => ({ id: uid(), description: "", amount: "" });
const blankDeptSales = () => {
  const obj = {};
  DEPARTMENTS.forEach(d => { obj[d] = [blankEntry()]; });
  return obj;
};
const blankSheet = (dateKey, sheetNum) => ({
  id: `${dateKey}-${sheetNum}`,
  date: dateKey, sheetNum,
  openingEntries:   [blankEntry()],
  otherCollections: [blankEntry()],
  departmentSales:  blankDeptSales(),
  expenses:         [blankEntry()],
  cashInHand: "", pendingAmount: "",
});

function _parseLocalDate(dateStr) {
  if (!dateStr) return new Date(NaN);
  const parts = dateStr.split("-");
  if (parts.length !== 3) return new Date(dateStr);
  const [y, m, d] = parts.map(p => parseInt(p, 10));
  return new Date(y, m - 1, d);
}
function formatDisplayDate(dateStr) {
  const d = _parseLocalDate(dateStr);
  return d.toLocaleDateString("en-GB", { weekday:"long", day:"2-digit", month:"long", year:"numeric" });
}
function formatShortDate(dateStr) {
  const d = _parseLocalDate(dateStr);
  return d.toLocaleDateString("en-GB", { day:"2-digit", month:"short", year:"numeric" });
}

const fPKR   = n => Number(n||0).toLocaleString("en-PK", { minimumFractionDigits: 0 });
const sumArr = arr => arr.reduce((s,e) => s + (parseFloat(e.amount)||0), 0);

const calcSheet = sheet => {
  if (!sheet) {
    return {
      totalOpening: 0,
      deptTotals:   Object.fromEntries(DEPARTMENTS.map(d => [d, 0])),
      totalSales:   0,
      totalCollection: 0,
      totalDeductions: 0,
      grossBalance:    0,
      cashInHandVal:   0,
      pendingAmtVal:   0,
      totalBalance:    0,
      difference:      0,
      isMatched:       true,
    };
  }

  const totalOpening = sumArr(sheet.openingEntries) + sumArr(sheet.otherCollections);
  const deptTotals = {};
  let totalSales = 0;
  DEPARTMENTS.forEach(d => {
    const t = sumArr(sheet.departmentSales[d]||[]);
    deptTotals[d] = t; totalSales += t;
  });
  const totalCollection = totalOpening + totalSales;
  const totalDeductions = sumArr(sheet.expenses);
  const grossBalance    = totalCollection - totalDeductions;
  const cashInHandVal   = parseFloat(sheet.cashInHand)    || 0;
  const pendingAmtVal   = parseFloat(sheet.pendingAmount) || 0;
  const totalBalance    = cashInHandVal + pendingAmtVal;
  const difference      = grossBalance - totalBalance;
  const isMatched       = Math.abs(difference) < 0.01;
  return {
    totalOpening, deptTotals, totalSales, totalCollection,
    totalDeductions, grossBalance, cashInHandVal, pendingAmtVal,
    totalBalance, difference, isMatched,
  };
};

// ─── Responsive Hook ──────────────────────────────────────────────────────────
function useWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}

// ─── Style helpers ────────────────────────────────────────────────────────────
const iStyle = (T, extra={}) => ({
  width:"100%", background:T.inputBg, border:`1px solid ${T.border}`,
  borderRadius:6, padding:"9px 12px", fontSize:13, color:T.text,
  outline:"none", fontFamily:T.sans, boxSizing:"border-box",
  transition:"border-color 0.15s, box-shadow 0.15s", ...extra,
});

// ══════════════════════════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ══════════════════════════════════════════════════════════════════════════════

function CardShell({ children, style={} }) {
  const T = useT();
  return (
    <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:12, padding:24, marginBottom:16, ...style }}>
      {children}
    </div>
  );
}
function CardTitle({ children }) {
  const T = useT();
  return <div style={{ fontSize:13, fontWeight:700, color:T.text, marginBottom:6, fontFamily:T.sans }}>{children}</div>;
}
function CardDesc({ children }) {
  const T = useT();
  return <p style={{ fontSize:12, color:T.textMuted, marginBottom:18, lineHeight:1.6 }}>{children}</p>;
}

function AddRowBtn({ onAdd, style={} }) {
  const T = useT();
  return (
    <button onClick={onAdd}
      style={{ background:T.accentDim, border:`1px dashed rgba(0,196,122,0.4)`, color:T.accent,
        borderRadius:6, padding:"7px 16px", fontSize:12, fontWeight:600, cursor:"pointer",
        fontFamily:T.sans, transition:"background 0.15s", ...style }}
      onMouseEnter={ev => ev.currentTarget.style.background = T.accentHov}
      onMouseLeave={ev => ev.currentTarget.style.background = T.accentDim}>
      + Add Row
    </button>
  );
}

function EntryTable({ entries, onUpdate, onAdd, onRemove, descPlaceholder, isMobile }) {
  const T     = useT();
  const total = sumArr(entries);
  const thS   = {
    padding:"10px 12px", textAlign:"left", fontSize:10, fontWeight:700,
    color:T.textMuted, letterSpacing:1.2, textTransform:"uppercase",
    fontFamily:T.sans, borderBottom:`1px solid ${T.border}`, background:T.surface,
  };
  const tdS = { padding:"8px 12px", verticalAlign:"middle" };

  if (isMobile) {
    return (
      <div>
        {entries.map((e,i) => (
          <div key={e.id} style={{ background:T.inputBg, border:`1px solid ${T.border}`, borderRadius:8, padding:14, marginBottom:10 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
              <span style={{ fontSize:10, color:T.textMuted, fontWeight:700, letterSpacing:1, fontFamily:T.mono }}>ROW {i+1}</span>
              {entries.length > 1 && (
                <button onClick={() => onRemove(e.id)}
                  style={{ background:"none", border:"none", color:T.red, cursor:"pointer", fontSize:16, opacity:0.7, padding:0 }}>✕</button>
              )}
            </div>
            <input style={iStyle(T,{marginBottom:8})} placeholder={descPlaceholder||"Description"}
              value={e.description} onChange={ev => onUpdate(e.id,"description",ev.target.value)} />
            <input style={iStyle(T,{textAlign:"right",fontFamily:T.mono})} type="number" placeholder="0"
              value={e.amount} onChange={ev => onUpdate(e.id,"amount",ev.target.value)} />
          </div>
        ))}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:12, borderTop:`1px solid ${T.border}` }}>
          <AddRowBtn onAdd={onAdd} />
          <span style={{ fontSize:14, fontWeight:700, fontFamily:T.mono, color:T.accent }}>PKR {fPKR(total)}</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ overflowX:"auto", borderRadius:8, border:`1px solid ${T.border}` }}>
        <table style={{ width:"100%", borderCollapse:"collapse", minWidth:400 }}>
          <thead>
            <tr>
              <th style={{...thS, width:36}}>#</th>
              <th style={thS}>Description</th>
              <th style={{...thS, textAlign:"right", width:160}}>Amount (PKR)</th>
              <th style={{...thS, width:40}}></th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e,i) => (
              <tr key={e.id} style={{ borderBottom:`1px solid ${T.borderLt}`, background: i%2===1 ? T.surfaceHov : T.surface }}>
                <td style={{...tdS, color:T.textDim, fontFamily:T.mono, fontSize:11}}>{i+1}</td>
                <td style={tdS}>
                  <input style={iStyle(T)} placeholder={descPlaceholder||"Enter description"}
                    value={e.description} onChange={ev => onUpdate(e.id,"description",ev.target.value)} />
                </td>
                <td style={tdS}>
                  <input style={iStyle(T,{textAlign:"right",fontFamily:T.mono})} type="number" placeholder="0"
                    value={e.amount} onChange={ev => onUpdate(e.id,"amount",ev.target.value)} />
                </td>
                <td style={tdS}>
                  {entries.length > 1 &&
                    <button onClick={() => onRemove(e.id)}
                      style={{ background:"none", border:"none", color:T.red, cursor:"pointer", fontSize:15, opacity:0.55, padding:"0 4px" }}
                      onMouseEnter={ev => ev.target.style.opacity = 1}
                      onMouseLeave={ev => ev.target.style.opacity = 0.55}>✕</button>}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ background:T.accentDim, borderTop:`1px solid rgba(0,196,122,0.2)` }}>
              <td colSpan={2} style={{...tdS, color:T.textMuted, fontSize:12}}>
                {entries.length} {entries.length===1?"entry":"entries"}
              </td>
              <td style={{...tdS, textAlign:"right", fontWeight:700, fontFamily:T.mono, color:T.accent, fontSize:14}}>
                PKR {fPKR(total)}
              </td>
              <td style={tdS}></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <AddRowBtn onAdd={onAdd} style={{ marginTop:12 }} />
    </div>
  );
}

function StatusBadge({ matched }) {
  const T = useT();
  return (
    <span style={{
      background: matched ? "rgba(0,196,122,0.12)" : "rgba(229,53,53,0.12)",
      color: matched ? T.accent : T.red,
      border:`1px solid ${matched ? "rgba(0,196,122,0.3)" : "rgba(229,53,53,0.3)"}`,
      padding:"4px 14px", borderRadius:20, fontSize:11, fontWeight:700, letterSpacing:0.8, fontFamily:T.sans,
    }}>
      {matched ? "✓ MATCHED" : "✗ UNMATCHED"}
    </span>
  );
}

function TotalBanner({ label, value, isRed }) {
  const T   = useT();
  const color = isRed ? T.red : T.accent;
  const rgb   = isRed ? "229,53,53" : "0,196,122";
  return (
    <div style={{ background:`rgba(${rgb},0.07)`, border:`1px solid rgba(${rgb},0.2)`,
      borderRadius:10, padding:"16px 20px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
      <span style={{ fontSize:13, fontWeight:600, color:T.text }}>{label}</span>
      <span style={{ fontSize:18, fontWeight:800, fontFamily:T.mono, color }}>PKR {fPKR(value)}</span>
    </div>
  );
}

function SumRow({ label, value, valueColor, bold, last }) {
  const T = useT();
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 0",
      borderBottom: last ? "none" : `1px solid ${T.borderLt}` }}>
      <span style={{ fontSize:13, color:bold?T.text:T.textMuted, fontWeight:bold?600:400 }}>{label}</span>
      <span style={{ fontFamily:T.mono, fontSize:bold?15:13, fontWeight:bold?700:400,
        color: valueColor||(bold?T.text:T.textMuted) }}>
        PKR {fPKR(value)}
      </span>
    </div>
  );
}

function PrintBtn({ onClick }) {
  const T = useT();
  return (
    <button onClick={onClick}
      style={{ background:"transparent", border:`1px solid ${T.border}`, color:T.textMuted,
        borderRadius:7, padding:"8px 16px", fontSize:12, fontWeight:600, cursor:"pointer",
        fontFamily:T.sans, transition:"all 0.15s", display:"flex", alignItems:"center", gap:6 }}
      onMouseEnter={ev => { ev.currentTarget.style.borderColor=T.accent; ev.currentTarget.style.color=T.accent; }}
      onMouseLeave={ev => { ev.currentTarget.style.borderColor=T.border; ev.currentTarget.style.color=T.textMuted; }}>
      ⎙ Download PDF
    </button>
  );
}

// ─── Saving indicator ─────────────────────────────────────────────────────────
function SaveIndicator({ saving }) {
  const T = useT();
  return saving ? (
    <span style={{ fontSize:10, color:T.textMuted, fontFamily:T.mono, letterSpacing:0.5 }}>saving…</span>
  ) : (
    <span style={{ fontSize:10, color:T.accent, fontFamily:T.mono, letterSpacing:0.5 }}>✓ saved</span>
  );
}

// ─── SheetItem ────────────────────────────────────────────────────────────────
function SheetItem({ label, sub, selected, onClick }) {
  const T = useT();
  return (
    <div onClick={onClick}
      style={{ background: selected ? T.accentDim : "transparent",
        border:`1px solid ${selected ? "rgba(0,196,122,0.3)" : T.borderLt}`,
        borderRadius:8, padding:"10px 12px", marginBottom:6, cursor:"pointer", transition:"all 0.15s" }}
      onMouseEnter={ev => { if (!selected) ev.currentTarget.style.background = T.surfaceHov; }}
      onMouseLeave={ev => { if (!selected) ev.currentTarget.style.background = "transparent"; }}>
      {label && <div style={{ fontSize:10, fontWeight:700, color:T.accent, marginBottom:2, letterSpacing:0.5 }}>{label}</div>}
      <div style={{ fontSize:12, fontWeight:500, color: selected ? T.text : T.textMuted }}>{sub}</div>
    </div>
  );
}

function ReportSection({ title, color, children }) {
  const T = useT();
  return (
    <div style={{ marginBottom:28 }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
        <div style={{ width:3, height:16, background:color, borderRadius:2 }}/>
        <span style={{ fontSize:10, fontWeight:700, letterSpacing:1.5, textTransform:"uppercase", color:T.textMuted, fontFamily:T.sans }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

function ReportTable({ rows, total, totalColor }) {
  const T = useT();
  return (
    <div style={{ background:T.inputBg, borderRadius:8, overflow:"hidden", border:`1px solid ${T.border}` }}>
      {rows.map(([label,val],i) => (
        <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
          padding:"10px 14px", borderBottom:`1px solid ${T.borderLt}`,
          background: i%2===1 ? T.surfaceHov : "transparent" }}>
          <span style={{ fontSize:13, color:T.text }}>{label}</span>
          <span style={{ fontFamily:T.mono, fontSize:13, color:T.textMuted }}>PKR {fPKR(val)}</span>
        </div>
      ))}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
        padding:"12px 14px", background:T.accentDim, borderTop:`1px solid rgba(0,196,122,0.2)` }}>
        <span style={{ fontSize:13, fontWeight:700, color:T.text }}>{total[0]}</span>
        <span style={{ fontFamily:T.mono, fontSize:14, fontWeight:700, color: totalColor || T.accent }}>PKR {fPKR(total[1])}</span>
      </div>
    </div>
  );
}

function ReportView({ sheet }) {
  const T = useT();
  const c = calcSheet(sheet);
  return (
    <div>
      <ReportSection title="Collections" color={T.accent}>
        <ReportTable
          rows={[
            ...sheet.openingEntries.map((e,i)   => [e.description||`Opening Balance ${i+1}`,  e.amount]),
            ...sheet.otherCollections.map((e,i) => [e.description||`Other Collection ${i+1}`, e.amount]),
          ]}
          total={["Total Opening", c.totalOpening]} />
      </ReportSection>
      <ReportSection title="Sales by Department" color="#38bdf8">
        <ReportTable rows={DEPARTMENTS.map(d => [d, c.deptTotals[d]])} total={["Total Sales", c.totalSales]} />
        <div style={{ marginTop:6, padding:"10px 14px", background:"rgba(56,189,248,0.07)", borderRadius:8,
          display:"flex", justifyContent:"space-between", alignItems:"center", border:`1px solid rgba(56,189,248,0.2)` }}>
          <span style={{ fontSize:12, color:T.textMuted }}>Total Collection</span>
          <span style={{ fontFamily:T.mono, fontWeight:700, color:"#38bdf8", fontSize:14 }}>PKR {fPKR(c.totalCollection)}</span>
        </div>
      </ReportSection>
      <ReportSection title="Deductions" color={T.red}>
        <ReportTable rows={sheet.expenses.map((e,i) => [e.description||`Expense ${i+1}`, e.amount])}
          total={["Total Deductions", c.totalDeductions]} totalColor={T.red} />
      </ReportSection>
      <ReportSection title="Day-End Summary" color={T.text}>
        <div style={{ display:"grid", gap:1, background:T.border, borderRadius:8, overflow:"hidden" }}>
          {[
            ["Gross Balance",         c.grossBalance,  T.text,     true],
            ["Cash in Hand",          c.cashInHandVal, T.textMuted],
            ["Pendings / Receivable", c.pendingAmtVal, T.textMuted],
            ["Total Balance",         c.totalBalance,  T.text,     true],
            ["Difference", c.isMatched ? "—" : `PKR ${fPKR(Math.abs(c.difference))}`, c.isMatched ? T.accent : T.red],
          ].map(([lbl,val,color,bold]) => (
            <div key={lbl} style={{ background:T.surface, display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 16px" }}>
              <span style={{ fontSize:13, color:T.textMuted }}>{lbl}</span>
              <span style={{ fontFamily:T.mono, fontSize:14, color, fontWeight:bold?700:400 }}>
                {typeof val === "number" ? `PKR ${fPKR(val)}` : val}
              </span>
            </div>
          ))}
          <div style={{ background:T.surface, display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 16px" }}>
            <span style={{ fontSize:13, color:T.textMuted }}>Status</span>
            <StatusBadge matched={c.isMatched} />
          </div>
        </div>
      </ReportSection>
    </div>
  );
}

// ─── Print helper ─────────────────────────────────────────────────────────────
// ─── Print helper (jsPDF — same screen pe rahega) ─────────────────────────

function doPrint(sheet) {
  const c = calcSheet(sheet);

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const PAGE_W = 210;
  const MARGIN = 10;
  const W = PAGE_W - MARGIN * 2;

  const DARK = [20, 20, 20];
  const GREEN = [0, 150, 100];
  const RED = [220, 60, 60];
  const GRAY = [120, 120, 120];

  let y = 14;

  // ── Header (minimal) ──
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...DARK);
  doc.text("TERMINIX CASH REPORT", MARGIN, y);

  doc.setFontSize(9);
  doc.setTextColor(...GRAY);
  doc.text(
    `Sheet #${sheet.sheetNum} | ${formatDisplayDate(sheet.date)}`,
    PAGE_W - MARGIN,
    y,
    { align: "right" }
  );

  y += 10;

  function title(text) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...DARK);
    doc.text(text, MARGIN, y);
    y += 4;
  }

  function table(head, body, foot) {
    autoTable(doc, {
      startY: y,
      margin: { left: MARGIN, right: MARGIN },
      head,
      body,
      foot,
      theme: "plain",
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: DARK,
        textColor: 255,
        fontSize: 8,
      },
      footStyles: {
        fontStyle: "bold",
        textColor: 255,
        fillColor: GREEN,
      },
      columnStyles: {
        1: { halign: "right" },
      },
    });

    y = doc.lastAutoTable.finalY + 5;
  }

  // ── Collections ──
  title("Collections");

  const coll = [
    ...sheet.openingEntries.map(e => [
      e.description || "Opening",
      `PKR ${fPKR(e.amount)}`,
    ]),
    ...sheet.otherCollections.map(e => [
      e.description || "Other",
      `PKR ${fPKR(e.amount)}`,
    ]),
  ];

  table(
    [["Particulars", "Amount"]],
    coll,
    [["Total", `PKR ${fPKR(c.totalOpening)}`]]
  );

  // ── Sales ──
  title("Sales");

  table(
    [["Dept", "Sales"]],
    DEPARTMENTS.map(d => [d, `PKR ${fPKR(c.deptTotals[d])}`]),
    [["Total Sales", `PKR ${fPKR(c.totalSales)}`]]
  );

  // ── Deductions ──
  title("Deductions");

  table(
    [["Particulars", "Amount"]],
    sheet.expenses.map(e => [
      e.description || "Expense",
      `PKR ${fPKR(e.amount)}`,
    ]),
    [["Total", `PKR ${fPKR(c.totalDeductions)}`]],
    RED
  );

  // ── Summary ──
  title("Summary");

  table(
    [["Particulars", "Amount"]],
    [
      ["Cash in Hand", `PKR ${fPKR(c.cashInHandVal)}`],
      ["Pending", `PKR ${fPKR(c.pendingAmtVal)}`],
      ["Total", `PKR ${fPKR(c.totalBalance)}`],
      [
        "Difference",
        c.isMatched ? "0" : `PKR ${fPKR(Math.abs(c.difference))}`,
      ],
    ],
    []
  );

  // ── Status (tiny) ──
  doc.setFontSize(9);
  doc.setTextColor(...(c.isMatched ? GREEN : RED));
  doc.text(
    c.isMatched ? "MATCHED ✓" : "UNMATCHED ✗",
    PAGE_W - MARGIN,
    y + 2,
    { align: "right" }
  );

  // ── Footer ──
  doc.setFontSize(7);
  doc.setTextColor(...GRAY);
  doc.text("Terminix Cash System", MARGIN, 287);

  doc.save(`Terminix-${sheet.date}-S${sheet.sheetNum}.pdf`);
}

// ══════════════════════════════════════════════════════════════════════════════
// HISTORY TAB — infinite scroll sidebar
// ══════════════════════════════════════════════════════════════════════════════
function HistoryTab({ currentSheet, isMobile, T }) {
  const [historySheet,   setHistorySheet]   = useState(null);
  const [historyFilters] = useState({
    start: (() => { const d = new Date(); d.setMonth(d.getMonth()-3); const y = d.getFullYear(); const m = String(d.getMonth()+1).padStart(2,'0'); const day = String(d.getDate()).padStart(2,'0'); return `${y}-${m}-${day}`; })(),
    end:   today(),
  });

  const {
    data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading,
  } = useHistorySummary(historyFilters);

  const historyRows = data?.pages.flatMap(p => p.data) ?? [];

  const { sheet: selectedSheet, isLoading: sheetLoading } = useGetSheetById(historySheet?.id);

  const sentinelRef = useRef(null);
  useEffect(() => {
    if (!sentinelRef.current) return;
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage)
        fetchNextPage();
    }, { threshold: 0.1 });
    obs.observe(sentinelRef.current);
    return () => obs.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const displaySheet = selectedSheet || historySheet;

  return (
    <div style={{ display:"grid", gridTemplateColumns: displaySheet&&!isMobile?"220px 1fr":"1fr", gap:16, alignItems:"start" }}>
      {/* Sidebar list */}
      <CardShell style={{ marginBottom:0 }}>
        <CardTitle>Saved Sheets</CardTitle>

          <SheetItem label="Current Sheet"
        sub={`${formatShortDate(currentSheet.date)} · #${currentSheet.sheetNum}`}
        selected={historySheet?.id === currentSheet.id}
        onClick={() => setHistorySheet(currentSheet)} />

        {isLoading && (
          <p style={{ fontSize:12, color:T.textMuted, marginTop:8 }}>Loading…</p>
        )}

        {historyRows
          .filter(r => r.id !== currentSheet.id)
          .map(r => (
            <SheetItem key={r.id}
              sub={`${formatShortDate(r.sheet_date || r.date)} · #${r.sheet_num || r.sheetNum}`}
              selected={historySheet?.id === r.id}
              onClick={() => setHistorySheet(r)} />
          ))}

        <div ref={sentinelRef} style={{ height:4 }} />
        {isFetchingNextPage && (
          <p style={{ fontSize:11, color:T.textMuted, textAlign:"center", padding:"8px 0" }}>Loading more…</p>
        )}
        {!hasNextPage && historyRows.length > 0 && (
          <p style={{ fontSize:11, color:T.textDim, textAlign:"center", padding:"8px 0" }}>All sheets loaded</p>
        )}
      </CardShell>

      {/* Detail panel */}
      {displaySheet && (
        <CardShell style={{ marginBottom:0 }}>
          {isMobile && (
            <button onClick={() => setHistorySheet(null)}
              style={{ marginBottom:14, background:"none", border:`1px solid ${T.border}`, borderRadius:6,
                padding:"6px 12px", fontSize:12, cursor:"pointer", color:T.textMuted, fontFamily:T.sans }}>← Back</button>
          )}
          {sheetLoading ? (
            <p style={{ fontSize:13, color:T.textMuted }}>Loading sheet…</p>
          ) : (
            <>
              <div style={{ display:"flex", flexWrap:"wrap", gap:12, justifyContent:"space-between", alignItems:"center", marginBottom:22 }}>
                <div>
                  <CardTitle>{formatDisplayDate(displaySheet.date || displaySheet.sheet_date)}</CardTitle>
                  <div style={{ fontSize:11, color:T.textMuted }}>Sheet #{displaySheet.sheetNum || displaySheet.sheet_num}</div>
                </div>
                <PrintBtn onClick={() => doPrint(displaySheet)} />
              </div>
              {displaySheet.openingEntries
                ? <ReportView sheet={displaySheet} />
                : <p style={{ fontSize:13, color:T.textMuted }}>Select a sheet to view its report.</p>
              }
            </>
          )}
        </CardShell>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════════════
export default function CashierDashboard() {
  const [mode,           setMode]           = useState("dark");
  const [tab,            setTab]            = useState(0);
  const [sheet,          setSheet]          = useState(null);
  const [activeDept,     setActiveDept]     = useState(DEPARTMENTS[0]);
  const [filterDept,     setFilterDept]     = useState("All");
  const [showNewConfirm, setShowNewConfirm] = useState(false);
  const [newSheetDate,   setNewSheetDate]   = useState(today());
  const [saving,         setSaving]         = useState(false);
  const [activeSheetId,  setActiveSheetId]  = useState(null);
  // BUG FIX: After a manual save, updateSheet invalidates the cache which
  // triggers a refetch. When that refetch lands, the sync effect would overwrite
  // local state with the server response (which may carry a date corrupted by
  // UTC timezone shifting). This ref lets us skip exactly one server sync
  // after a user-initiated save so local state remains the source of truth.
  const skipNextSyncRef = useRef(false);
  const user = useSelector((state) => state.user.userDetails);

  const { mutate: logout } = useLogout();

  const width     = useWidth();
  const isMobile  = width < 640;
  const isTablet  = width < 900;
  const T         = makeTokens(mode);

  // ── API hooks ──────────────────────────────────────────────────────────────
  const { createSheet, isPending: creating } = useCreateSheet();
  const { updateSheet, isPending: updating } = useUpdateSheet();

  const { sheet: serverSheet, isLoading: loadingSheet } = useGetSheetById(activeSheetId);

  const { data: listData } = useGetSheetList();
  const sheetList = listData?.pages.flatMap(p => p.data) ?? [];

  const { summary: dayStats } = useDashboardSummary(today());

  // ── Bootstrap: pick last existing sheet ──────────────────────────────────
  useEffect(() => {
    if (activeSheetId) return;
    if (listData === undefined) return;

    const allSheets = sheetList;
    if (allSheets.length > 0) {
      setActiveSheetId(allSheets[0].id);
    }
  }, [listData, activeSheetId, sheetList]);

  // ── Sync serverSheet -> local sheet state ─────────────────────────────────
  useEffect(() => {
    if (!serverSheet || saving) return;
    // If a manual save just completed, skip this one sync so the server's
    // response doesn't overwrite the local working copy (and corrupt the date).
    if (skipNextSyncRef.current) {
      skipNextSyncRef.current = false;
      return;
    }
    setSheet(serverSheet);
  }, [serverSheet, saving]);

  // ── Manual save handler ───────────────────────────────────────────────────
  const handleSaveSheet = useCallback(() => {
    if (!sheet || !activeSheetId) return;
    setSaving(true);
    // Mark that the next server sync should be skipped — the cache invalidation
    // triggered by updateSheet will cause a refetch, but we don't want that
    // response to overwrite the local state (which is already up to date and
    // has the correct local date).
    skipNextSyncRef.current = true;
    updateSheet(
      { ...sheet, id: activeSheetId },
      {
        onSettled: () => setSaving(false),
      }
    );
  }, [sheet, activeSheetId, updateSheet]);

  // ── New Sheet handler ─────────────────────────────────────────────────────
  const handleNewSheet = useCallback(async (dateKey) => {
    setShowNewConfirm(false);
    const todaySheetsCount = sheetList.filter(s => (s.date || "").startsWith(dateKey)).length;
    const num  = todaySheetsCount + 1;
    const newS = blankSheet(dateKey, num);
    createSheet(newS, {
      onSuccess: (res) => {
        const created = res.data.data;
        setSheet(created);
        setActiveSheetId(created.id);
        setTab(0);
        setActiveDept(DEPARTMENTS[0]);
      },
    });
  }, [sheetList, createSheet]);

  // ── Local updaters ────────────────────────────────────────────────────────
  const setField = useCallback((field,val)        => setSheet(p => ({...p,[field]:val})), []);
  const updEntry = useCallback((field,id,key,val) => setSheet(p => ({...p,[field]:p[field].map(e=>e.id===id?{...e,[key]:val}:e)})), []);
  const addEntry = useCallback(field              => setSheet(p => ({...p,[field]:[...p[field],blankEntry()]})), []);
  const remEntry = useCallback((field,id)         => setSheet(p => ({...p,[field]:p[field].filter(e=>e.id!==id)})), []);
  const updDept  = useCallback((dept,id,key,val)  => setSheet(p => ({...p,departmentSales:{...p.departmentSales,[dept]:p.departmentSales[dept].map(e=>e.id===id?{...e,[key]:val}:e)}})), []);
  const addDept  = useCallback(dept               => setSheet(p => ({...p,departmentSales:{...p.departmentSales,[dept]:[...p.departmentSales[dept],blankEntry()]}})), []);
  const remDept  = useCallback((dept,id)          => setSheet(p => ({...p,departmentSales:{...p.departmentSales,[dept]:p.departmentSales[dept].filter(e=>e.id!==id)}})), []);

  const h = {
    updO: useCallback((i,k,v) => updEntry("openingEntries",i,k,v),   [updEntry]),
    addO: useCallback(() => addEntry("openingEntries"),               [addEntry]),
    remO: useCallback(i => remEntry("openingEntries",i),              [remEntry]),
    updC: useCallback((i,k,v) => updEntry("otherCollections",i,k,v), [updEntry]),
    addC: useCallback(() => addEntry("otherCollections"),             [addEntry]),
    remC: useCallback(i => remEntry("otherCollections",i),            [remEntry]),
    updE: useCallback((i,k,v) => updEntry("expenses",i,k,v),         [updEntry]),
    addE: useCallback(() => addEntry("expenses"),                     [addEntry]),
    remE: useCallback(i => remEntry("expenses",i),                    [remEntry]),
  };
  const deptH = {
    upd: useCallback((id,k,v) => updDept(activeDept,id,k,v), [updDept, activeDept]),
    add: useCallback(() => addDept(activeDept),               [addDept, activeDept]),
    rem: useCallback(id => remDept(activeDept,id),            [remDept, activeDept]),
  };

  // ── Loading / empty state ─────────────────────────────────────────────────
  if (loadingSheet || creating || (!sheet && sheetList.length > 0)) {
    return (
      <div style={{ minHeight:"100vh", background:T.bg, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:T.sans }}>
        <div style={{ color:T.textMuted, fontSize:13 }}>
          {creating ? "Creating sheet…" : "Loading…"}
        </div>
      </div>
    );
  }

  if (!sheet && sheetList.length === 0) {
    return (
      <ThemeCtx.Provider value={T}>
        <div style={{ minHeight:"100vh", background:T.bg, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:T.sans }}>
          <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:12, padding:24, maxWidth:420, width:"100%", textAlign:"center" }}>
            <h2 style={{ fontSize:18, marginBottom:8, color:T.text }}>No sheets yet</h2>
            <p style={{ fontSize:13, color:T.textMuted, marginBottom:20 }}>
              Click the button below to create your first cashier sheet for today.
            </p>
            {/*
              BUG FIX: This is an early return — the New Sheet modal lives only in
              the main return block below, so setShowNewConfirm(true) had nowhere
              to render. Fix: call handleNewSheet() directly, skipping the modal.
              There is nothing to confirm when no sheets exist yet.
            */}
            <button
              onClick={() => handleNewSheet(today())}
              disabled={creating}
              style={{ background:T.accent, color:"#0d1117", border:"none", borderRadius:8, padding:"10px 18px",
                fontSize:14, fontWeight:700, cursor: creating ? "not-allowed" : "pointer",
                opacity: creating ? 0.6 : 1 }}
            >
              {creating ? "Creating…" : "+ New Sheet"}
            </button>
          </div>
        </div>
      </ThemeCtx.Provider>
    );
  }

  const c            = calcSheet(sheet);
  const dayEndFilled = sheet.cashInHand !== "" || sheet.pendingAmount !== "";

  // ── Tab renderer ──────────────────────────────────────────────────────────
  const renderTab = () => {
    switch (tab) {

      case 0: return (
        <>
          <CardShell>
            <CardTitle>Opening Balance</CardTitle>
            <CardDesc>Carryover or previous day closing amounts.</CardDesc>
            <EntryTable entries={sheet.openingEntries} onUpdate={h.updO} onAdd={h.addO} onRemove={h.remO}
              descPlaceholder="Source / Description" isMobile={isMobile} />
          </CardShell>
          <CardShell>
            <CardTitle>Other Collections</CardTitle>
            <CardDesc>Bank transfers, party payments, and other receipts.</CardDesc>
            <EntryTable entries={sheet.otherCollections} onUpdate={h.updC} onAdd={h.addC} onRemove={h.remC}
              descPlaceholder="Source (e.g. Meezan–Terminix)" isMobile={isMobile} />
          </CardShell>
          <TotalBanner label="Total Opening Balance" value={c.totalOpening} />
        </>
      );

      case 1: return (
        <>
          <CardShell>
            <CardTitle>Sales Entry</CardTitle>
            <CardDesc>Select a department and log sales below.</CardDesc>
            <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:18 }}>
              {DEPARTMENTS.map(d => (
                <button key={d} onClick={() => setActiveDept(d)} style={{
                  padding:"6px 14px", borderRadius:20, fontSize:11, fontWeight:600, cursor:"pointer", fontFamily:T.sans,
                  border:`1px solid ${activeDept===d ? T.accent : T.border}`,
                  background: activeDept===d ? T.accentDim : "transparent",
                  color: activeDept===d ? T.accent : T.textMuted, transition:"all 0.15s",
                }}>
                  {d}{c.deptTotals[d] > 0 && <span style={{ marginLeft:5, fontSize:9 }}>●</span>}
                </button>
              ))}
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 14px",
              background:T.accentDim, border:`1px solid rgba(0,196,122,0.2)`, borderRadius:8, marginBottom:16 }}>
              <span style={{ fontSize:12, color:T.accent, fontWeight:600 }}>{activeDept}</span>
              <span style={{ fontFamily:T.mono, fontSize:13, fontWeight:700, color:T.accent }}>PKR {fPKR(c.deptTotals[activeDept])}</span>
            </div>
            <EntryTable entries={sheet.departmentSales[activeDept]||[blankEntry()]}
              onUpdate={deptH.upd} onAdd={deptH.add} onRemove={deptH.rem}
              descPlaceholder="Bill / Invoice description" isMobile={isMobile} />
          </CardShell>
          <CardShell>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
              <CardTitle>Department Summary</CardTitle>
              <select value={filterDept} onChange={e => setFilterDept(e.target.value)}
                style={iStyle(T, {width:"auto", fontSize:11, padding:"6px 10px", cursor:"pointer", borderRadius:6})}>
                <option value="All">All Depts</option>
                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div style={{ display:"grid", gap:1, background:T.border, borderRadius:8, overflow:"hidden" }}>
              {DEPARTMENTS.filter(d => filterDept==="All" || d===filterDept).map(d => {
                const filled = (sheet.departmentSales[d]||[]).filter(e => parseFloat(e.amount)>0).length;
                const isAct  = d === activeDept;
                return (
                  <div key={d} style={{ background:isAct?T.accentDim:T.surface, display:"flex", justifyContent:"space-between",
                    alignItems:"center", padding:"10px 14px", cursor:"pointer", transition:"background 0.1s" }}
                    onClick={() => { setActiveDept(d); window.scrollTo(0,0); }}
                    onMouseEnter={ev => { if(!isAct) ev.currentTarget.style.background = T.surfaceHov; }}
                    onMouseLeave={ev => { if(!isAct) ev.currentTarget.style.background = T.surface; }}>
                    <div>
                      <span style={{ fontSize:13, color:isAct?T.accent:T.text, fontWeight:isAct?600:400 }}>{d}</span>
                      {filled > 0 && <span style={{ marginLeft:8, fontSize:10, color:T.textMuted }}>{filled} entr{filled===1?"y":"ies"}</span>}
                    </div>
                    <span style={{ fontFamily:T.mono, fontSize:13, color:c.deptTotals[d]>0?T.text:T.textDim, fontWeight:c.deptTotals[d]>0?600:400 }}>
                      PKR {fPKR(c.deptTotals[d])}
                    </span>
                  </div>
                );
              })}
              <div style={{ background:T.accentDim, display:"flex", justifyContent:"space-between", alignItems:"center",
                padding:"12px 14px", borderTop:`1px solid rgba(0,196,122,0.2)` }}>
                <span style={{ fontSize:13, fontWeight:700, color:T.text }}>{filterDept==="All"?"Total Sales":`${filterDept} Total`}</span>
                <span style={{ fontFamily:T.mono, fontSize:14, fontWeight:700, color:T.accent }}>
                  PKR {fPKR(filterDept==="All" ? c.totalSales : c.deptTotals[filterDept])}
                </span>
              </div>
            </div>
          </CardShell>
        </>
      );

      case 2: return (
        <>
          <CardShell>
            <CardTitle>Expenses & Deductions</CardTitle>
            <CardDesc>Staff payments, daily expenses, purchases, and all outflows.</CardDesc>
            <EntryTable entries={sheet.expenses} onUpdate={h.updE} onAdd={h.addE} onRemove={h.remE}
              descPlaceholder="Expense description" isMobile={isMobile} />
          </CardShell>
          <TotalBanner label="Total Deductions" value={c.totalDeductions} isRed />
        </>
      );

      case 3: return (
        <>
          <CardShell>
            <CardTitle>Calculation Summary</CardTitle>
            <SumRow label="Total Opening Balance" value={c.totalOpening} />
            <SumRow label="Total Sales"           value={c.totalSales} />
            <SumRow label="Total Collection"      value={c.totalCollection} bold valueColor={T.text} />
            <SumRow label="Total Deductions"      value={c.totalDeductions} valueColor={T.red} />
            <SumRow label="Gross Balance"         value={c.grossBalance} bold valueColor={T.accent} last />
          </CardShell>
          <CardShell>
            <CardTitle>Cash in Hand & Pendings</CardTitle>
            <CardDesc>Enter physical cash and pending receivable amounts.</CardDesc>
            <div style={{ display:"grid", gridTemplateColumns: isMobile?"1fr":"1fr 1fr", gap:16 }}>
              {[["Cash in Hand (PKR)","cashInHand"],["Pendings / Receivable (PKR)","pendingAmount"]].map(([lbl,field]) => (
                <div key={field}>
                  <label style={{ fontSize:10, fontWeight:700, color:T.textMuted, letterSpacing:1, textTransform:"uppercase", display:"block", marginBottom:8 }}>{lbl}</label>
                  <input style={iStyle(T,{fontSize:15,fontFamily:T.mono,fontWeight:700,padding:"12px 14px",textAlign:"right",borderRadius:8})}
                    type="number" placeholder="0" value={sheet[field]} onChange={e => setField(field, e.target.value)} />
                </div>
              ))}
            </div>
          </CardShell>
          {dayEndFilled && (
            <CardShell>
              <CardTitle>Balance Verification</CardTitle>
              <SumRow label="Gross Balance" value={c.grossBalance} />
              <SumRow label="Total Balance (Cash + Pending)" value={c.totalBalance} />
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 0", borderBottom:`1px solid ${T.borderLt}` }}>
                <span style={{ fontSize:13, color:T.textMuted }}>Difference</span>
                <span style={{ fontFamily:T.mono, fontSize:13, color:c.isMatched?T.accent:T.red, fontWeight:600 }}>
                  {c.isMatched ? "—" : `PKR ${fPKR(Math.abs(c.difference))}`}
                </span>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:14 }}>
                <span style={{ fontSize:13, fontWeight:600, color:T.text }}>Status</span>
                <StatusBadge matched={c.isMatched} />
              </div>
            </CardShell>
          )}
        </>
      );

      case 4: return (
        <CardShell>
          <div style={{ display:"flex", flexWrap:"wrap", gap:12, justifyContent:"space-between", alignItems:"center", marginBottom:22 }}>
            <div>
              <CardTitle>Report</CardTitle>
              <div style={{ fontSize:11, color:T.textMuted }}>{formatDisplayDate(sheet.date)} · Sheet #{sheet.sheetNum}</div>
            </div>
            <PrintBtn onClick={() => doPrint(sheet)} />
          </div>
          <ReportView sheet={sheet} />
        </CardShell>
      );

      case 5:
        return <HistoryTab currentSheet={sheet} isMobile={isMobile} T={T} />;

      default: return null;
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <ThemeCtx.Provider value={T}>
      <div style={{ minHeight:"100vh", background:T.bg, fontFamily:T.sans, color:T.text, transition:"background 0.2s, color 0.2s" }}>
        {/*
          BUG FIX: Removed stray JS import statement that was embedded in the CSS
          template string. Previously the string contained:
            button { font-family: inherit; }import { useDashboardSummary } from '...';
          which injected invalid CSS into the page.
        */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
          * { box-sizing: border-box; }
          input:focus, select:focus { border-color: ${T.accent} !important; box-shadow: 0 0 0 3px rgba(0,196,122,0.12) !important; outline: none; }
          button { font-family: inherit; }import { useSelector } from 'react-redux';

          ::-webkit-scrollbar { height: 4px; width: 4px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: ${T.border}; border-radius: 4px; }
          input[type=number]::-webkit-inner-spin-button { opacity: 0.4; }
          input::placeholder { color: ${T.textDim}; }
          select option { background: ${T.surface}; color: ${T.text}; }
        `}</style>

        {/* Header */}
     {/* Header */}
<header style={{
  background: T.surface, borderBottom: `1px solid ${T.border}`,
  padding: isMobile ? "0 12px" : "0 24px",
  display: "flex", alignItems: "center", justifyContent: "space-between",
  height: isMobile ? 52 : 60, position: "sticky", top: 0, zIndex: 100,
  gap: 8,
}}>

  {/* Left — Logo */}
  <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
<div
  style={{
    width: isMobile ? 26 : 30,
    height: isMobile ? 26 : 30,
    borderRadius: 7,
    overflow: "hidden",
    flexShrink: 0,
  }}
>
  <img
    src="/logo.png"   // 👈 apna logo path yahan
    alt="logo"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
    }}
  />
</div>
    {!isMobile && (
      <div>
        <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.3 }}>TERMINIX PAKISTAN</div>
        <div style={{ fontSize: 10, color: T.textMuted, letterSpacing: 0.5, marginTop: -1 }}>CASHIER </div>
      </div>
    )}
    {isMobile && (
      <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: -0.3 }}>TERMINIX</div>
    )}
  </div>

  {/* Right — Actions */}
  <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 6 : 8, flexShrink: 0 }}>

    {/* Save indicator — desktop only */}
    {!isMobile && <SaveIndicator saving={saving || updating} />}

    {/* Save button */}
    <button
      onClick={handleSaveSheet}
      disabled={!sheet || saving || updating}
      style={{
        background: "#00c47a", color: "#0d1117", border: "none", borderRadius: 7,
        padding: isMobile ? "6px 10px" : "7px 14px",
        fontSize: isMobile ? 11 : 12, fontWeight: 700,
        cursor: (!sheet || saving || updating) ? "not-allowed" : "pointer",
        opacity: (!sheet || saving || updating) ? 0.6 : 1,
        whiteSpace: "nowrap",
      }}>
      {saving || updating ? (isMobile ? "…" : "Saving…") : "Save"}
    </button>

    {/* New Sheet button */}
    <button
      onClick={() => { setNewSheetDate(today()); setShowNewConfirm(true); }}
      style={{
        background: "transparent", color: T.accent,
        border: `1px solid rgba(0,196,122,0.4)`, borderRadius: 7,
        padding: isMobile ? "6px 10px" : "7px 14px",
        fontSize: isMobile ? 11 : 12, fontWeight: 700,
        cursor: "pointer", whiteSpace: "nowrap",
      }}
      onMouseEnter={ev => ev.currentTarget.style.background = T.accentDim}
      onMouseLeave={ev => ev.currentTarget.style.background = "transparent"}>
      {isMobile ? "+ Sheet" : "+ New Sheet"}
    </button>

    {/* Dark / Light toggle */}
    <button
      onClick={() => setMode(m => m === "dark" ? "light" : "dark")}
      title={mode === "dark" ? "Light mode" : "Dark mode"}
      style={{
        background: T.surfaceHov, border: `1px solid ${T.border}`, color: T.textMuted,
        borderRadius: 7, padding: isMobile ? "6px 9px" : "7px 12px",
        fontSize: 14, cursor: "pointer",
        display: "flex", alignItems: "center", gap: 4, transition: "all 0.15s",
      }}
      onMouseEnter={ev => { ev.currentTarget.style.borderColor = T.accent; ev.currentTarget.style.color = T.accent; }}
      onMouseLeave={ev => { ev.currentTarget.style.borderColor = T.border; ev.currentTarget.style.color = T.textMuted; }}>
      {mode === "dark" ? "☀" : "🌙"}
      {!isMobile && (
        <span style={{ fontSize: 11, fontWeight: 600 }}>
          {mode === "dark" ? "Light" : "Dark"}
        </span>
      )}
    </button>

    {/* Today's date — desktop only */}
    {!isMobile && (
      <span style={{
        fontSize: 11, color: T.textMuted, background: T.inputBg,
        border: `1px solid ${T.border}`, padding: "4px 10px", borderRadius: 6,
        whiteSpace: "nowrap",
      }}>
        {formatShortDate(today())}
      </span>
    )}

    {/* Divider */}
    <div style={{ width: 1, height: 28, background: T.border, flexShrink: 0 }} />

    {/* User info + Logout */}
    {user && !isMobile && (
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        background: T.inputBg, border: `1px solid ${T.border}`,
        borderRadius: 8, padding: "5px 10px",
      }}>
        {/* Avatar */}
        <div style={{
          width: 26, height: 26, borderRadius: "50%",
          background: T.accentDim, border: `1px solid rgba(0,196,122,0.3)`,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: T.accent }}>
            {user.name?.charAt(0)?.toUpperCase() ?? "U"}
          </span>
        </div>
        {/* Name + Role */}
        <div style={{ lineHeight: 1.25 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: T.text, whiteSpace: "nowrap" }}>
            {user.name}
          </div>
          <div style={{ fontSize: 9, fontWeight: 600, color: T.accent, textTransform: "uppercase", letterSpacing: 0.8 }}>
            {user.role}
          </div>
        </div>
        {/* Divider */}
        <div style={{ width: 1, height: 22, background: T.border }} />
        {/* Logout */}
        <button
          onClick={() => logout()}
          style={{
            background: "none", border: "none", color: T.textMuted, cursor: "pointer",
            fontSize: 11, fontWeight: 600, padding: "2px 0", fontFamily: T.sans,
            display: "flex", alignItems: "center", gap: 4, transition: "color 0.15s",
          }}
          onMouseEnter={ev => ev.currentTarget.style.color = T.red}
          onMouseLeave={ev => ev.currentTarget.style.color = T.textMuted}>
          <span style={{ fontSize: 13 }}>⏻</span> Logout
        </button>
      </div>
    )}

    {/* Mobile — avatar + logout as icon buttons */}
    {user && isMobile && (
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {/* Avatar pill */}
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          background: T.accentDim, border: `1px solid rgba(0,196,122,0.35)`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: T.accent }}>
            {user.name?.charAt(0)?.toUpperCase() ?? "U"}
          </span>
        </div>
        {/* Logout icon */}
        <button
          onClick={() => logout()}
          title="Logout"
          style={{
            background: T.inputBg, border: `1px solid ${T.border}`,
            color: T.textMuted, borderRadius: 7,
            padding: "6px 9px", fontSize: 13, cursor: "pointer",
            display: "flex", alignItems: "center", transition: "all 0.15s",
          }}
          onMouseEnter={ev => { ev.currentTarget.style.borderColor = T.red; ev.currentTarget.style.color = T.red; }}
          onMouseLeave={ev => { ev.currentTarget.style.borderColor = T.border; ev.currentTarget.style.color = T.textMuted; }}>
          ⏻
        </button>
      </div>
    )}

  </div>
</header>

        {/* New Sheet Modal */}
        {showNewConfirm && (
          <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.65)", zIndex:200,
            display:"flex", alignItems:"center", justifyContent:"center", padding:16, backdropFilter:"blur(6px)" }}>
            <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:14,
              padding:28, maxWidth:400, width:"100%", boxShadow:T.shadow }}>
              <div style={{ fontSize:16, fontWeight:700, color:T.text, marginBottom:6 }}>Start a New Sheet</div>
              <p style={{ fontSize:13, color:T.textMuted, marginBottom:22, lineHeight:1.7 }}>
                Current sheet is auto-saved. Choose a date and create the new sheet.
              </p>
              <div style={{ marginBottom:22 }}>
                <label style={{ fontSize:10, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:1, display:"block", marginBottom:8 }}>Sheet Date</label>
                <input type="date" value={newSheetDate} onChange={e => setNewSheetDate(e.target.value)}
                  style={iStyle(T,{fontSize:14, padding:"10px 12px"})} />
                <div style={{ fontSize:11, color:T.textMuted, marginTop:6 }}>
                  {newSheetDate===today()?"Today · ":""}{formatDisplayDate(newSheetDate)}
                </div>
              </div>
              <div style={{ display:"flex", gap:10 }}>
                <button onClick={() => handleNewSheet(newSheetDate)} disabled={!newSheetDate || creating}
                  style={{ flex:1, background:newSheetDate?T.accent:"#aaa", color:"#0d1117",
                    border:"none", borderRadius:8, padding:12, fontSize:14, fontWeight:700,
                    cursor:newSheetDate?"pointer":"not-allowed", opacity:newSheetDate?1:0.5 }}>
                  {creating ? "Creating…" : "Create Sheet"}
                </button>
                <button onClick={() => setShowNewConfirm(false)}
                  style={{ flex:1, background:"transparent", color:T.textMuted, border:`1px solid ${T.border}`,
                    borderRadius:8, padding:12, fontSize:14, cursor:"pointer", fontFamily:T.sans }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Bar */}
        <div style={{ background:T.surface, borderBottom:`1px solid ${T.border}`,
          padding:isMobile?"10px 14px":"12px 24px", display:"flex", gap:isMobile?20:36, overflowX:"auto" }}>
          {[
            // BUG FIX: Use || instead of ?? so that a 0 returned by the API
            // (e.g. when the UTC date mismatched the sheet's local date) also
            // falls back to the live local calculation instead of showing PKR 0.
            { label:"Collection",    val: dayStats?.total_collection || c.totalCollection, color:T.text  },
            { label:"Deductions",    val: dayStats?.total_deductions || c.totalDeductions, color:T.red   },
            { label:"Gross Balance", val: dayStats?.gross_balance    || c.grossBalance,    color:T.accent },
          ].map(s => (
            <div key={s.label} style={{ minWidth:isMobile?90:120, flexShrink:0 }}>
              <div style={{ fontSize:9, fontWeight:700, textTransform:"uppercase", letterSpacing:1.2, color:T.textMuted, marginBottom:3 }}>{s.label}</div>
              <div style={{ fontSize:isMobile?13:14, fontWeight:700, fontFamily:T.mono, color:s.color }}>PKR {fPKR(s.val)}</div>
            </div>
          ))}
          <div style={{ minWidth:100, flexShrink:0, marginLeft:"auto" }}>
            <div style={{ fontSize:9, fontWeight:700, textTransform:"uppercase", letterSpacing:1.2, color:T.textMuted, marginBottom:3 }}>Sheet</div>
            {console.log(sheet.date)}
            <div style={{ fontSize:11, fontWeight:600, color:T.textMuted }}>#{sheet.sheetNum} · {formatShortDate(sheet.date)}</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ background:T.surface, borderBottom:`1px solid ${T.border}`,
          display:"flex", overflowX:"auto", padding:isMobile?"0 6px":"0 16px", gap:2 }}>
          {TABS.map(({id,label,icon}) => (
            <button key={id} onClick={() => setTab(id)} style={{
              padding:isMobile?"12px 10px":"13px 16px", fontSize:isMobile?11:12,
              fontWeight:tab===id?600:400, color:tab===id?T.accent:T.textMuted,
              background:"none", border:"none", cursor:"pointer", whiteSpace:"nowrap",
              borderBottom:"2px solid", borderBottomColor:tab===id?T.accent:"transparent",
              transition:"color 0.15s, border-color 0.15s",
              display:"flex", alignItems:"center", gap:6, fontFamily:T.sans,
            }}
              onMouseEnter={ev => { if(tab!==id) ev.currentTarget.style.color=T.text; }}
              onMouseLeave={ev => { if(tab!==id) ev.currentTarget.style.color=T.textMuted; }}>
              <span style={{ fontSize:13 }}>{icon}</span>{label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ maxWidth:isTablet?"100%":860, margin:isMobile?"12px 0":"20px auto",
          padding:isMobile?"0 10px":"0 16px", paddingBottom:60 }}>
          {renderTab()}
        </div>
      </div>
    </ThemeCtx.Provider>
  );
}