import { useState, useMemo, useCallback, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Plus, Trash2, Edit2, Search, Download, CheckCircle, AlertCircle, TrendingUp, DollarSign, Activity, Clock, Calendar, Shield, Users, ClipboardList, BarChart2, BookOpen, X } from "lucide-react";
import { useLogout } from "../../../api/client/user";
import { useSelector } from "react-redux";
import logo from "../../assets/logo.png";
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";
// ── Constants ─────────────────────────────────────────────────────────────────
const INITIAL_DATA = [
  { id: 1, date: "2025-01-01", invoice: "3574", client: "MR. FAIZAN", cell: "0331-2834429", address: "NAZIMABAD", service: "COCKROACHES", fumigator: "ALI", amount: 7000, paid: 7000, pending: 0, sharing: "A", notes: "" },
  { id: 2, date: "2025-01-01", invoice: "3573", client: "MR. RAHEEL", cell: "0321-2759061", address: "DHA-VIII", service: "TERMITE", fumigator: "MUBASHIR", amount: 10000, paid: 10000, pending: 0, sharing: "K", notes: "" },
  { id: 3, date: "2025-01-02", invoice: "3577", client: "MR. SALMAN", cell: "0300-3756795", address: "DHA-VI", service: "TERMITE", fumigator: "IMRAN", amount: 35000, paid: 35000, pending: 0, sharing: "H", notes: "" },
  { id: 4, date: "2025-01-04", invoice: "3582", client: "MR. NAVEED", cell: "0311-2460242", address: "CLIFTON", service: "TERMITE", fumigator: "ALI", amount: 19500, paid: 10000, pending: 9500, sharing: "MO/A", notes: "Partial payment received" },
  { id: 5, date: "2025-01-09", invoice: "3598", client: "MR. AHSAN", cell: "0308-4464407", address: "BAHRIA TOWN", service: "TER / FOG", fumigator: "NABEEL", amount: 40000, paid: 40000, pending: 0, sharing: "HT/H", notes: "" },
];

const SERVICES = ["TERMITE","COCKROACHES","GENERAL","SPRAY","FLAT TER","PRE-CONST","LABOR (TER)","BUGS / RATS","TER / FOG","SPRAY (TER)","RATS CONTROL","GEN / TANK CLEAN"];
const FUMIGATORS = ["ALI","IMRAN","NAVEED","MUBASHIR","NABEEL","KONAIN","MADAM","ADIL","USAMA","MUHABBAT","IM. SIR"];
const EMPTY_FORM = () => ({ date: new Date().toISOString().slice(0, 10), invoice: "", client: "", cell: "", address: "", service: "", fumigator: "", amount: "", paid: "", pending: "", sharing: "", notes: "" });

// ── Yup Validation Schema ─────────────────────────────────────────────────────
const entryValidationSchema = yup.object().shape({
  date: yup.string().required("Date is required"),
  invoice: yup.string().required("Invoice # is required"),
  client: yup.string().required("Client name is required"),
  cell: yup.string().required("Cell number is required"),
  address: yup.string().required("Address is required"),
  service: yup.string().required("Service is required"),
  fumigator: yup.string().required("Fumigator is required"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .integer("Amount must be a whole number")
    .required("Amount is required")
    .min(0, "Amount must be positive"),
  paid: yup
    .number()
    .typeError("Paid must be a number")
    .integer("Paid must be a whole number")
    .required("Paid is required")
    .min(0, "Paid must be positive"),
  pending: yup
    .number()
    .transform((value, originalValue) => {
      if (originalValue === "" || Number.isNaN(value)) return undefined;
      return value;
    })
    .integer("Pending must be a whole number")
    .notRequired(),
  sharing: yup.string(),
  notes: yup.string(),
});

// ── Helpers ───────────────────────────────────────────────────────────────────
const Rs = (n) => "Rs " + (n || 0).toLocaleString();
const pct = (a, b) => (b > 0 ? Math.round((a / b) * 100) : 0);
const initials = (s) => {
  const w = (s || "").replace(/^MR\.\s*/i, "").trim().split(" ");
  return w.length >= 2 ? w[0][0] + w[1][0] : w[0] ? w[0].slice(0, 2) : "?";
};

const AVATAR_COLORS = [
  "bg-indigo-50 text-indigo-700",
  "bg-emerald-50 text-emerald-700",
  "bg-amber-50 text-amber-700",
  "bg-blue-50 text-blue-700",
  "bg-red-50 text-red-700",
];
const avatarColor = (s) => AVATAR_COLORS[(s || "").charCodeAt(0) % AVATAR_COLORS.length];
const formatPeriodLabel = (period) => {
  const [y, m] = (period || "").split("-");
  const year = Number(y);
  const month = Number(m);
  if (!year || !month) return period;
  return new Date(year, month - 1, 1).toLocaleString("en-US", { month: "long", year: "numeric" });
};

const svcBadge = (s) => {
  if (!s) return { cls: "bg-gray-100 text-gray-700", label: "—" };
  if (["TERMITE","TER / FOG","FLAT TER","SPRAY (TER)"].includes(s)) return { cls: "bg-emerald-50 text-emerald-700", label: s };
  if (["COCKROACHES","BUGS / RATS","RATS CONTROL"].includes(s)) return { cls: "bg-red-50 text-red-700", label: s };
  if (["GENERAL","GEN / TANK CLEAN"].includes(s)) return { cls: "bg-blue-50 text-blue-700", label: s };
  if (["SPRAY","PRE-CONST"].includes(s)) return { cls: "bg-amber-50 text-amber-700", label: s };
  return { cls: "bg-gray-100 text-gray-700", label: s };
};

// ── Shared class strings ──────────────────────────────────────────────────────
const INP = "w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-900 bg-white outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 transition-colors placeholder:text-gray-400";
const INP_RO = "w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-500 bg-gray-50 outline-none cursor-default";
const BTN = "px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition-colors inline-flex items-center gap-1 cursor-pointer";
const BTN_PRIMARY = "px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 text-white border-0 hover:from-indigo-500 hover:to-fuchsia-500 transition-all shadow-sm inline-flex items-center gap-1 cursor-pointer";
const BTN_SM = "px-2 py-1 rounded-md text-xs font-medium border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition-colors inline-flex items-center gap-1 cursor-pointer";
const FI = "px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-900 bg-white outline-none focus:border-indigo-400 transition-colors";
const TH_BASE = "px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide border-b border-gray-200 bg-gray-50 whitespace-nowrap";
const PANEL = "bg-white/95 backdrop-blur border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow";
const PANEL_HD = "flex items-center justify-between px-3.5 py-3 border-b border-gray-100 bg-gradient-to-r from-slate-50 to-indigo-50";
const LABEL = "text-xs font-semibold text-gray-400 uppercase tracking-wider";
const CHART_COLORS = ["#6366f1", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6"];

const FormGroup = ({ label, children, full, error }) => (
  <div className={`flex flex-col gap-1${full ? " col-span-2" : ""}`}>
    <label className={LABEL}>{label}</label>
    {children}
    {error && <span className="text-xs text-red-500 font-medium">{error.message}</span>}
  </div>
);

// ── Lucide Icon Map ───────────────────────────────────────────────────────────
const ICON_MAP = {
  "book-open": BookOpen,
  "bar-chart-2": BarChart2,
  clock: Clock,
  "clipboard-list": ClipboardList,
  users: Users,
  shield: Shield,
  plus: Plus,
  download: Download,
  search: Search,
  x: X,
  "edit-2": Edit2,
  "trash-2": Trash2,
  "check-circle": CheckCircle,
  "alert-circle": AlertCircle,
  "trending-up": TrendingUp,
  "dollar-sign": DollarSign,
  activity: Activity,
  calendar: Calendar,
};

const LucideIcon = ({ n, s = 14, c = "currentColor" }) => {
  const IconComponent = ICON_MAP[n];
  if (!IconComponent) return null;
  return <IconComponent size={s} color={c} style={{ flexShrink: 0, display: "inline-block" }} />;
};

// ── KPI Strip ─────────────────────────────────────────────────────────────────
const KpiStrip = ({ data }) => {
  const rev = data.reduce((s, r) => s + r.amount, 0);
  const col = data.reduce((s, r) => s + r.paid, 0);
  const pend = data.reduce((s, r) => s + r.pending, 0);
  const rate = pct(col, rev);

  const cards = [
    { icon: "clipboard-list", iconCls: "bg-indigo-50 text-indigo-700", label: "Total Jobs", val: data.length },
    { icon: "dollar-sign", iconCls: "bg-blue-50 text-blue-700", label: "Gross Revenue", val: Rs(rev) },
    { icon: "check-circle", iconCls: "bg-emerald-50 text-emerald-700", label: "Collected", val: Rs(col), delta: { cls: "bg-emerald-50 text-emerald-700", txt: "↑ " + rate + "%" } },
    { icon: "alert-circle", iconCls: "bg-red-50 text-red-700", label: "Outstanding", val: Rs(pend), delta: pend > 0 ? { cls: "bg-red-50 text-red-700", txt: "Due" } : null },
    { icon: "trending-up", iconCls: "bg-orange-50 text-orange-700", label: "Collection Rate", val: rate + "%" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-2.5 mb-4">
      {cards.map((c, i) => (
        <div key={i} className="bg-gradient-to-br from-white to-slate-50 border border-gray-200 rounded-xl p-3.5 flex flex-col gap-2 shadow-sm">
          <div className="flex items-start justify-between">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${c.iconCls}`}>
              <LucideIcon n={c.icon} s={16} />
            </div>
            {c.delta && (
              <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${c.delta.cls}`}>{c.delta.txt}</span>
            )}
          </div>
          <div className="text-xl font-bold text-gray-900 leading-none">{c.val}</div>
          <div className="text-xs text-gray-400 font-medium">{c.label}</div>
        </div>
      ))}
    </div>
  );
};

// ── Entry Modal ───────────────────────────────────────────────────────────────
const EntryModal = ({ initial, onSave, onClose }) => {
  const { control, handleSubmit, watch, formState: { errors }, reset } = useForm({
    resolver: yupResolver(entryValidationSchema),
    defaultValues: initial || EMPTY_FORM(),
    mode: "onBlur" // Validate on blur instead of on change for better performance
  });

  // Reset form when initial changes
  useEffect(() => {
    reset(initial || EMPTY_FORM());
  }, [initial, reset]);

  const amount = watch("amount");
  const paid = watch("paid");

  // Auto-calculate pending when amount or paid changes
  const pending = Math.max(0, (parseInt(amount, 10) || 0) - (parseInt(paid, 10) || 0));

  const onSubmit = (data) => {
    console.log("[Fumigation EntryModal] submit payload (raw):", data);
    const formData = { 
      ...data, 
      amount: parseInt(data.amount, 10) || 0, 
      paid: parseInt(data.paid, 10) || 0, 
      pending: pending
    };
    console.log("[Fumigation EntryModal] submit payload (normalized):", formData);
    
    // Only include ID if editing, not for new entries
    if (initial?.id) {
      formData.id = initial.id;
    }
    
    onSave(formData);
  };
  const onInvalid = (formErrors) => {
    console.error("[Fumigation EntryModal] submit blocked by validation:", formErrors);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5" style={{ background: "rgba(17,24,39,.45)" }} onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-y-auto border border-gray-200 shadow-2xl" style={{ maxHeight: "88vh" }} onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="flex justify-between items-center px-5 py-3.5 border-b border-gray-200 sticky top-0 bg-white z-10">
          <span className="text-sm font-bold text-gray-900">
            {initial?.id ? `Edit — ${initial.client}` : "New Journal Entry"}
          </span>
          <button className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-1 rounded-lg border-0 bg-transparent flex items-center cursor-pointer" onClick={onClose}>
            <LucideIcon n="x" s={16} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
          <div className="px-5 py-4">
            <div className={`${LABEL} mb-2.5`}>Job Details</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <FormGroup label="Date" name="date" error={errors.date}>
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <input
                      className={`${INP} ${errors.date ? 'border-red-400' : ''}`}
                      type="date"
                      {...field}
                      value={field.value ?? ""}
                    />
                  )}
                />
              </FormGroup>
              <FormGroup label="Invoice #" name="invoice" error={errors.invoice}>
                <Controller
                  name="invoice"
                  control={control}
                  render={({ field }) => (
                    <input
                      className={`${INP} ${errors.invoice ? 'border-red-400' : ''}`}
                      type="text"
                      placeholder="e.g. 3574"
                      {...field}
                      value={field.value ?? ""}
                    />
                  )}
                />
              </FormGroup>
              <FormGroup label="Name of Client" name="client" error={errors.client}>
                <Controller
                  name="client"
                  control={control}
                  render={({ field }) => (
                    <input
                      className={`${INP} ${errors.client ? 'border-red-400' : ''}`}
                      type="text"
                      placeholder="MR. / MRS. NAME"
                      {...field}
                      value={field.value ?? ""}
                    />
                  )}
                />
              </FormGroup>
              <FormGroup label="Cell No." name="cell" error={errors.cell}>
                <Controller
                  name="cell"
                  control={control}
                  render={({ field }) => (
                    <input
                      className={`${INP} ${errors.cell ? 'border-red-400' : ''}`}
                      type="tel"
                      placeholder="03XX-XXXXXXX"
                      {...field}
                      value={field.value ?? ""}
                    />
                  )}
                />
              </FormGroup>
              <FormGroup label="Address" name="address" full error={errors.address}>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <input
                      className={`${INP} ${errors.address ? 'border-red-400' : ''}`}
                      type="text"
                      placeholder="Area / Colony"
                      {...field}
                      value={field.value ?? ""}
                    />
                  )}
                />
              </FormGroup>
              <FormGroup label="Services" name="service" error={errors.service}>
                <Controller
                  name="service"
                  control={control}
                  render={({ field }) => (
                    <select
                      className={`${INP} ${errors.service ? 'border-red-400' : ''}`}
                      {...field}
                      value={field.value ?? ""}
                    >
                      <option value="">— select —</option>
                      {SERVICES.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  )}
                />
              </FormGroup>
              <FormGroup label="Fumigator" name="fumigator" error={errors.fumigator}>
                <Controller
                  name="fumigator"
                  control={control}
                  render={({ field }) => (
                    <select
                      className={`${INP} ${errors.fumigator ? 'border-red-400' : ''}`}
                      {...field}
                      value={field.value ?? ""}
                    >
                      <option value="">— select —</option>
                      {FUMIGATORS.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  )}
                />
              </FormGroup>
              <FormGroup label="Sharing Code" name="sharing">
                <Controller
                  name="sharing"
                  control={control}
                  render={({ field }) => (
                    <input
                      className={INP}
                      type="text"
                      placeholder="e.g. A / K / MO/A"
                      {...field}
                      value={field.value ?? ""}
                    />
                  )}
                />
              </FormGroup>
            </div>

            <div className={`${LABEL} mt-4 mb-2.5`}>Payment</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <FormGroup label="Amount (Rs.)" name="amount" error={errors.amount}>
                <Controller
                  name="amount"
                  control={control}
                  render={({ field }) => (
                    <input
                      className={`${INP} ${errors.amount ? 'border-red-400' : ''}`}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="0"
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const digitsOnly = e.target.value.replace(/\D/g, "");
                        field.onChange(digitsOnly);
                      }}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  )}
                />
              </FormGroup>
              <FormGroup label="Paid (Rs.)" name="paid" error={errors.paid}>
                <Controller
                  name="paid"
                  control={control}
                  render={({ field }) => (
                    <input
                      className={`${INP} ${errors.paid ? 'border-red-400' : ''}`}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="0"
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const digitsOnly = e.target.value.replace(/\D/g, "");
                        field.onChange(digitsOnly);
                      }}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  )}
                />
              </FormGroup>
              <FormGroup label="Pending (auto)" name="pending">
                <input 
                  className={INP_RO} 
                  type="number" 
                  readOnly 
                  value={pending} 
                />
              </FormGroup>
              <FormGroup label="Notes" name="notes">
                <Controller
                  name="notes"
                  control={control}
                  render={({ field }) => (
                    <input
                      className={INP}
                      type="text"
                      placeholder="Any remarks…"
                      {...field}
                      value={field.value ?? ""}
                    />
                  )}
                />
              </FormGroup>
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-2 justify-end px-5 py-3 border-t border-gray-200 sticky bottom-0 bg-white">
            <button type="button" className={BTN} onClick={onClose}>Cancel</button>
            <button type="submit" className={BTN_PRIMARY}>
              <LucideIcon n="check-circle" s={13} />
              Save Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ── Delete Confirm ────────────────────────────────────────────────────────────
const DeleteConfirm = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-5" style={{ background: "rgba(17,24,39,.45)" }} onClick={onCancel}>
    <div className="bg-white rounded-2xl w-full max-w-sm border border-gray-200 shadow-2xl" onClick={(e) => e.stopPropagation()}>
      <div className="flex justify-between items-center px-5 py-3.5 border-b border-gray-200">
        <span className="text-sm font-bold text-gray-900">Delete this entry?</span>
        <button className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-1 rounded-lg border-0 bg-transparent flex items-center cursor-pointer" onClick={onCancel}>
          <LucideIcon n="x" s={16} />
        </button>
      </div>
      <div className="px-5 py-4 text-xs text-gray-500">
        This action cannot be undone. The record will be permanently removed.
      </div>
      <div className="flex gap-2 justify-end px-5 py-3 border-t border-gray-200">
        <button className={BTN} onClick={onCancel}>Cancel</button>
        <button className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-red-500 text-white border-0 hover:bg-red-600 transition-colors inline-flex items-center gap-1 cursor-pointer" onClick={onConfirm}>
          <LucideIcon n="trash-2" s={13} c="#fff" />
          Delete
        </button>
      </div>
    </div>
  </div>
);

// ── Transaction Journal ───────────────────────────────────────────────────────
const TransactionJournal = ({ data, allData, period, setPeriod, periodOptions, onAdd, onEdit, onDelete }) => {
  const [search, setSearch] = useState("");
  const [fSvc, setFSvc] = useState("");
  const [fFum, setFFum] = useState("");
  const [fStatus, setFStatus] = useState("");
  const [sKey, setSKey] = useState("date");
  const [sDir, setSDir] = useState(-1);

  const toggleSort = (k) => {
    if (sKey === k) setSDir((d) => d * -1);
    else { setSKey(k); setSDir(-1); }
  };
  const sortIndicator = (k) => sKey === k ? (sDir === -1 ? " ↓" : " ↑") : "";

  const SortTH = ({ k, children }) => (
    <th onClick={() => toggleSort(k)} className={`${TH_BASE} cursor-pointer select-none transition-colors ${sKey === k ? "text-indigo-700" : "text-gray-400 hover:text-gray-600"}`}>
      {children}{sortIndicator(k)}
    </th>
  );
  const PlainTH = ({ children }) => (
    <th className={`${TH_BASE} text-gray-400`}>{children}</th>
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return [...data].filter((r) => {
      const hit = !q || [r.client, r.invoice, r.address, r.cell].join(" ").toLowerCase().includes(q);
      const sv = !fSvc || r.service === fSvc;
      const fu = !fFum || r.fumigator === fFum;
      const st = !fStatus || (fStatus === "paid" ? r.pending === 0 : r.pending > 0);
      return hit && sv && fu && st;
    }).sort((a, b) => {
      const av = a[sKey], bv = b[sKey];
      return typeof av === "number" ? sDir * (av - bv) : sDir * String(av).localeCompare(String(bv));
    });
  }, [data, search, fSvc, fFum, fStatus, sKey, sDir]);

  const tot = filtered.reduce((s, r) => ({ a: s.a + r.amount, p: s.p + r.paid, n: s.n + r.pending }), { a: 0, p: 0, n: 0 });
  const anyFilter = search || fSvc || fFum || fStatus;
  const clearAll = () => { setSearch(""); setFSvc(""); setFFum(""); setFStatus(""); };

  const exportCSV = () => {
    const hdr = ["Date","Invoice","Name of Client","Cell No.","Address","Services","Fumigator","Amount","Paid","Pending","Sharing","Notes"];
    const rows = filtered.map((r) =>
      [r.date,r.invoice,r.client,r.cell,r.address,r.service,r.fumigator,r.amount,r.paid,r.pending,r.sharing,r.notes].map((v) => `"${v}"`).join(",")
    );
    const blob = new Blob([[hdr.join(","), ...rows].join("\n")], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "terminix_journal.csv"; a.click();
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-end sm:items-center mb-3 gap-2">
        <button className={BTN} onClick={exportCSV}>
          <LucideIcon n="download" s={13} />Export CSV
        </button>
        <button className={BTN_PRIMARY} onClick={onAdd}>
          <LucideIcon n="plus" s={13} />New Entry
        </button>
      </div>

      <div className={PANEL}>
        <div className={PANEL_HD}>
          <div>
            <div className="text-sm font-bold text-gray-900">Transaction Journal</div>
            <div className="text-xs text-gray-400 mt-0.5">{allData.length} records total</div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex gap-1.5 px-3 py-2.5 border-b border-gray-200 bg-gray-50 flex-wrap items-center">
          <div className="flex items-center gap-1.5">
            <LucideIcon n="calendar" s={12} c="#6366f1" />
            <select className="px-2.5 py-1.5 border border-indigo-200 rounded-lg text-xs text-indigo-700 bg-indigo-50 outline-none font-semibold focus:border-indigo-400" value={period} onChange={(e) => setPeriod(e.target.value)}>
              {periodOptions.map((p) => (
                <option key={p} value={p}>{formatPeriodLabel(p)}</option>
              ))}
              <option value="all">All Periods</option>
            </select>
          </div>

          <div className="hidden sm:block w-px h-5 bg-gray-200 mx-1" />

          <div className="relative w-full sm:flex-1" style={{ minWidth: 140 }}>
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none flex">
              <LucideIcon n="search" s={12} />
            </span>
            <input className={`${FI} pl-7 w-full`} placeholder="Search client, invoice, address…" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>

          <select className={`${FI} w-full sm:w-auto`} value={fSvc} onChange={(e) => setFSvc(e.target.value)}>
            <option value="">All Services</option>
            {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select className={`${FI} w-full sm:w-auto`} value={fFum} onChange={(e) => setFFum(e.target.value)}>
            <option value="">All Fumigators</option>
            {FUMIGATORS.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
          <select className={`${FI} w-full sm:w-auto`} value={fStatus} onChange={(e) => setFStatus(e.target.value)}>
            <option value="">All Status</option>
            <option value="paid">Cleared</option>
            <option value="pending">Pending</option>
          </select>

          {anyFilter && (
            <button className={BTN_SM} onClick={clearAll}>
              <LucideIcon n="x" s={11} />Clear
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <SortTH k="date">Date</SortTH>
                <SortTH k="invoice">Invoice</SortTH>
                <SortTH k="client">Name of Client</SortTH>
                <PlainTH>Cell No.</PlainTH>
                <PlainTH>Address</PlainTH>
                <PlainTH>Services</PlainTH>
                <SortTH k="fumigator">Fumigator</SortTH>
                <SortTH k="amount">Amount</SortTH>
                <SortTH k="paid">Paid</SortTH>
                <SortTH k="pending">Pending</SortTH>
                <PlainTH>Sharing</PlainTH>
                <PlainTH></PlainTH>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={12} className="px-3 py-9 text-center text-xs text-gray-400">
                    No records match current filters.
                  </td>
                </tr>
              ) : filtered.map((r) => {
                const { cls, label } = svcBadge(r.service);
                const av = initials(r.client);
                const ac = avatarColor(r.client);
                return (
                  <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-2.5 text-xs text-gray-500 font-mono whitespace-nowrap">{r.date}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      <span className="text-indigo-600 font-semibold text-xs">{r.invoice || "—"}</span>
                    </td>
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${ac}`}>{av}</div>
                        <span className="text-xs font-semibold text-gray-900">{r.client}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-xs text-gray-400 font-mono whitespace-nowrap">{r.cell || "—"}</td>
                    <td className="px-3 py-2.5 text-xs text-gray-500 whitespace-nowrap" style={{ maxWidth: 100, overflow: "hidden", textOverflow: "ellipsis" }}>{r.address || "—"}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${cls}`}>{label}</span>
                    </td>
                    <td className="px-3 py-2.5 text-xs text-gray-400 whitespace-nowrap">{r.fumigator || "—"}</td>
                    <td className="px-3 py-2.5 text-xs font-mono text-gray-500 whitespace-nowrap">{r.amount ? Rs(r.amount) : "—"}</td>
                    <td className="px-3 py-2.5 text-xs font-mono font-semibold whitespace-nowrap" style={{ color: "#10b981" }}>{r.paid ? Rs(r.paid) : "—"}</td>
                    <td className="px-3 py-2.5 text-xs font-mono whitespace-nowrap" style={{ color: r.pending > 0 ? "#ef4444" : "#10b981", fontWeight: r.pending > 0 ? 700 : 400 }}>
                      {r.pending > 0 ? Rs(r.pending) : (
                        <span className="flex items-center gap-1">
                          <LucideIcon n="check-circle" s={11} c="#10b981" />Paid
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2.5 text-xs font-mono text-gray-400 whitespace-nowrap">{r.sharing || "—"}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      <div className="flex gap-1">
                        <button className={BTN_SM} onClick={() => onEdit(r)}>
                          <LucideIcon n="edit-2" s={11} />Edit
                        </button>
                        <button className="px-2 py-1 rounded-md text-xs font-medium border border-red-100 bg-white text-red-500 hover:bg-red-50 transition-colors inline-flex items-center gap-1 cursor-pointer" onClick={() => onDelete(r.id)}>
                          <LucideIcon n="trash-2" s={11} />Del
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="px-3 py-2.5 border-t border-gray-200 flex flex-col sm:flex-row justify-between sm:items-center gap-1.5 text-xs text-gray-400 bg-gray-50">
          <span>
            Showing <strong className="text-gray-900">{filtered.length}</strong> of <strong className="text-gray-900">{data.length}</strong> entries
          </span>
          <span className="font-mono">
            Total: <strong>{Rs(tot.a)}</strong> &nbsp; Paid:{" "}
            <strong style={{ color: "#10b981" }}>{Rs(tot.p)}</strong> &nbsp; Pending:{" "}
            <strong style={{ color: tot.n > 0 ? "#ef4444" : "#10b981" }}>{Rs(tot.n)}</strong>
          </span>
        </div>
      </div>
    </>
  );
};

// ── Analytics View ────────────────────────────────────────────────────────────
const AnalyticsView = ({ data }) => {
  const rev = data.reduce((s, r) => s + r.amount, 0);
  const col = data.reduce((s, r) => s + r.paid, 0);
  const pend = data.reduce((s, r) => s + r.pending, 0);

  const byFum = useMemo(() => {
    const m = {};
    data.forEach((r) => {
      if (r.fumigator) {
        if (!m[r.fumigator]) m[r.fumigator] = { rev: 0, jobs: 0 };
        m[r.fumigator].rev += r.amount;
        m[r.fumigator].jobs += 1;
      }
    });
    return Object.entries(m).sort((a, b) => b[1].rev - a[1].rev);
  }, [data]);

  const bySvc = useMemo(() => {
    const m = {};
    data.forEach((r) => {
      if (r.service) {
        if (!m[r.service]) m[r.service] = { jobs: 0, rev: 0 };
        m[r.service].jobs += 1;
        m[r.service].rev += r.amount;
      }
    });
    return Object.entries(m).sort((a, b) => b[1].rev - a[1].rev);
  }, [data]);

  const bySvcChart = useMemo(() => {
    const m = {};
    data.forEach((r) => { if (r.service) m[r.service] = (m[r.service] || 0) + r.amount; });
    return Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [data]);

  const paidCnt = data.filter((r) => r.pending === 0 && r.amount > 0).length;
  const partCnt = data.filter((r) => r.pending > 0).length;
  const total = data.length || 1;

  const fumigatorBarData = byFum.map(([name, { rev: amount, jobs }]) => ({ name, amount, jobs }));
  const servicePieData = bySvcChart.map(([name, amount]) => ({ name, amount }));
  const paymentPieData = [
    { name: "Collected", value: col },
    { name: "Outstanding", value: pend },
  ];
  const statusBarData = [
    { name: "Cleared", count: paidCnt },
    { name: "Pending", count: partCnt },
  ];
  const collectionTrendData = useMemo(() => {
    const map = {};
    data.forEach((r) => {
      if (!r.date) return;
      if (!map[r.date]) map[r.date] = { date: r.date, collected: 0, outstanding: 0 };
      map[r.date].collected += r.paid || 0;
      map[r.date].outstanding += r.pending || 0;
    });
    return Object.values(map).sort((a, b) => a.date.localeCompare(b.date)).slice(-7);
  }, [data]);

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
        <div className={PANEL}>
          <div className={PANEL_HD}>
            <div className="text-sm font-bold text-gray-900">Cash Flow Trend (Last 7 Days)</div>
          </div>
          <div className="p-3.5 h-72">
            {!collectionTrendData.length ? (
              <div className="text-xs text-gray-400">No new Activity for this month</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={collectionTrendData} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11, fill: "#6b7280" }}
                    tickFormatter={(v) => new Date(v).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  />
                  <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} />
                  <Tooltip
                    formatter={(value, key) => [Rs(value), key === "collected" ? "Inflow" : "Outflow"]}
                    labelFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "long", day: "numeric" })}
                    contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", background: "#ffffff", boxShadow: "0 10px 30px rgba(15,23,42,0.08)" }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="collected" name="Inflow" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: "#10b981" }} />
                  <Line type="monotone" dataKey="outstanding" name="Outflow" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4, fill: "#f43f5e" }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className={PANEL}>
          <div className={PANEL_HD}>
            <div className="text-sm font-bold text-gray-900">Sales by Service (Current Period)</div>
          </div>
          <div className="p-3.5 h-72">
            {!servicePieData.length ? (
              <div className="text-xs text-gray-400">No new Activity for this month</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={servicePieData} dataKey="amount" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={92} paddingAngle={2}>
                    {servicePieData.map((_, i) => (
                      <Cell key={`svc-cell-${i}`} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => Rs(value)} contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", background: "#ffffff", boxShadow: "0 10px 30px rgba(15,23,42,0.08)" }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className={`${PANEL} xl:col-span-2`}>
          <div className={PANEL_HD}>
            <div className="text-sm font-bold text-gray-900">Revenue by Fumigator (Performance)</div>
          </div>
          <div className="p-3.5 h-80">
            {!fumigatorBarData.length ? (
              <div className="text-xs text-gray-400">No new Activity for this month</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fumigatorBarData} margin={{ top: 10, right: 18, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6b7280" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} />
                  <Tooltip
                    formatter={(value, name) => {
                      if (name === "Revenue") return [Rs(value), "Earnings"];
                      return [value, "Jobs"];
                    }}
                    labelStyle={{ fontSize: 12 }}
                    contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", background: "#ffffff", boxShadow: "0 10px 30px rgba(15,23,42,0.08)" }}
                  />
                  <Legend />
                  <Bar dataKey="amount" name="Revenue" radius={[8, 8, 0, 0]} fill="#8b5cf6" />
                  <Bar dataKey="jobs" name="Jobs" radius={[8, 8, 0, 0]} fill="#06b6d4" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className={PANEL}>
          <div className={PANEL_HD}>
            <div className="text-sm font-bold text-gray-900">Collection vs Outstanding (Pie)</div>
          </div>
          <div className="p-3.5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={paymentPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={95} label={(d) => `${d.name}: ${pct(d.value, rev)}%`}>
                  <Cell fill="#22c55e" />
                  <Cell fill="#f43f5e" />
                </Pie>
                <Tooltip formatter={(value) => Rs(value)} contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", background: "#ffffff", boxShadow: "0 10px 30px rgba(15,23,42,0.08)" }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`${PANEL} xl:col-span-2`}>
          <div className={PANEL_HD}>
            <div className="text-sm font-bold text-gray-900">Job Status & Financial Summary</div>
          </div>
          <div className="p-3.5 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusBarData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6b7280" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", background: "#ffffff", boxShadow: "0 10px 30px rgba(15,23,42,0.08)" }} />
                  <Bar dataKey="count" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="border border-indigo-100 bg-indigo-50/50 rounded-xl p-3">
                <div className="text-[11px] text-gray-500">Gross Revenue</div>
                <div className="text-sm font-bold text-gray-900 mt-1">{Rs(rev)}</div>
              </div>
              <div className="border border-emerald-100 bg-emerald-50/60 rounded-xl p-3">
                <div className="text-[11px] text-gray-500">Collected</div>
                <div className="text-sm font-bold text-emerald-600 mt-1">{Rs(col)}</div>
              </div>
              <div className="border border-rose-100 bg-rose-50/60 rounded-xl p-3">
                <div className="text-[11px] text-gray-500">Outstanding</div>
                <div className="text-sm font-bold text-red-500 mt-1">{Rs(pend)}</div>
              </div>
              <div className="border border-violet-100 bg-violet-50/60 rounded-xl p-3">
                <div className="text-[11px] text-gray-500">Collection Rate</div>
                <div className="text-sm font-bold text-gray-900 mt-1">{rev > 0 ? `${pct(col, rev)}%` : "—"}</div>
              </div>
              <div className="border border-cyan-100 bg-cyan-50/60 rounded-xl p-3">
                <div className="text-[11px] text-gray-500">Avg Job Value</div>
                <div className="text-sm font-bold text-gray-900 mt-1">{data.length ? Rs(Math.round(rev / data.length)) : "—"}</div>
              </div>
              <div className="border border-amber-100 bg-amber-50/60 rounded-xl p-3">
                <div className="text-[11px] text-gray-500">Fully Cleared</div>
                <div className="text-sm font-bold text-gray-900 mt-1">{`${paidCnt} of ${total}`}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ── AR Aging View ─────────────────────────────────────────────────────────────
const AgingView = ({ data }) => {
  const today = new Date();
  const pending = data.filter((r) => r.pending > 0);

  const buckets = [
    { label: "0 – 30 days", max: 30, items: [] },
    { label: "31 – 60 days", max: 60, items: [] },
    { label: "61 – 90 days", max: 90, items: [] },
    { label: "90+ days", max: 9999, items: [] },
  ];
  pending.forEach((r) => {
    const days = Math.floor((today - new Date(r.date)) / 86400000);
    const bucket = buckets.find((b) => days <= b.max) || buckets[3];
    bucket.items.push({ ...r, days });
  });

  return (
    <>
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-900">AR Aging Report</h2>
        <div className="text-xs text-gray-400 mt-0.5">Outstanding balances by age bucket</div>
      </div>

      {!pending.length && (
        <div className="py-9 text-center text-emerald-700 font-semibold bg-emerald-50 rounded-xl text-sm flex items-center justify-center gap-2">
          <LucideIcon n="check-circle" s={16} c="#10b981" />
          No outstanding receivables — all accounts cleared
        </div>
      )}

      {buckets.filter((b) => b.items.length).map((b) => {
        const bt = b.items.reduce((s, r) => s + r.pending, 0);
        return (
          <div key={b.label} className={`${PANEL} mb-3`}>
            <div className={PANEL_HD}>
              <div>
                <div className="text-sm font-bold text-gray-900">{b.label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{b.items.length} invoice(s)</div>
              </div>
              <div className="font-mono text-xs text-red-500 font-bold">{Rs(bt)}</div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    {["Invoice","Name of Client","Services","Amount","Pending","Age"].map((h) => (
                      <th key={h} className={`${TH_BASE} text-gray-400`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {b.items.map((r) => {
                    const { cls, label } = svcBadge(r.service);
                    return (
                      <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-3 py-2.5 whitespace-nowrap">
                          <span className="text-indigo-600 font-semibold text-xs">{r.invoice}</span>
                        </td>
                        <td className="px-3 py-2.5 whitespace-nowrap">
                          <div className="font-semibold text-xs text-gray-900">{r.client}</div>
                          <div className="text-xs text-gray-400">{r.address}</div>
                        </td>
                        <td className="px-3 py-2.5 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${cls}`}>{label}</span>
                        </td>
                        <td className="px-3 py-2.5 text-xs font-mono text-gray-500 whitespace-nowrap">{Rs(r.amount)}</td>
                        <td className="px-3 py-2.5 text-xs font-mono font-bold text-red-500 whitespace-nowrap">{Rs(r.pending)}</td>
                        <td className="px-3 py-2.5 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${r.days > 60 ? "bg-red-50 text-red-700" : r.days > 30 ? "bg-amber-50 text-amber-700" : "bg-gray-100 text-gray-700"}`}>
                            {r.days}d
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </>
  );
};

// ── Main Shell ────────────────────────────────────────────────────────────────
export default function TerminixERP() {
  const user = useSelector((state) => state.user.userDetails);
  const { mutate: logout } = useLogout();
  const [data, setData] = useState(INITIAL_DATA);
  const [view, setView] = useState("journal");
  const currentPeriod = new Date().toISOString().slice(0, 7);
  const [period, setPeriod] = useState(currentPeriod);
  const [modal, setModal] = useState(null);
  const [delId, setDelId] = useState(null);
  const [nextId, setNextId] = useState(6);

  const VIEW_LABELS = { journal: "Transaction Journal", analytics: "Analytics", aging: "AR Aging Report" };
  const PERIOD_LABELS = { all: "All Periods" };
  const periodOptions = useMemo(() => {
    const months = new Set(data.map((r) => (r.date || "").slice(0, 7)).filter(Boolean));
    months.add(currentPeriod);
    return Array.from(months).sort((a, b) => b.localeCompare(a));
  }, [data, currentPeriod]);

  const periodData = useMemo(
    () => period === "all" ? data : data.filter((r) => r.date.startsWith(period)),
    [data, period]
  );
  const pendingCount = data.filter((r) => r.pending > 0).length;

  const saveEntry = useCallback((form) => {
    if (modal === "add") {
      setData((d) => [...d, { ...form, id: nextId }]);
      setNextId((n) => n + 1);
      if (form?.date) setPeriod(form.date.slice(0, 7));
    } else {
      setData((d) => d.map((r) => (r.id === modal.id ? { ...form, id: r.id } : r)));
    }
    setModal(null);
  }, [modal, nextId]);

  const confirmDelete = useCallback(() => {
    setData((d) => d.filter((r) => r.id !== delId));
    setDelId(null);
  }, [delId]);

  const navItems = [
    { id: "analytics", icon: "activity", label: "Analytics" },
    { id: "journal", icon: "book-open", label: "Transaction Journal" },
    { id: "aging", icon: "clock", label: "AR Aging", badge: pendingCount > 0 ? pendingCount : null },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { font-family: 'Plus Jakarta Sans', sans-serif; }
        body { background: #f5f5f8; }
      `}</style>

      <div className="flex flex-col md:flex-row min-h-screen md:h-screen overflow-hidden">
        {/* ── SIDEBAR ── */}
        <div className="w-full md:w-[220px] flex-shrink-0 bg-white border-b md:border-b-0 md:border-r border-gray-200 flex flex-col">

          {/* Logo */}
          <div className="flex items-center gap-2 border-b border-gray-200 px-3.5 py-3.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0">
              <img src={logo} alt="Terminix" className="w-full h-full object-cover" />
\            </div>
            <div>
              <div className="text-sm font-bold text-gray-900 leading-tight">Terminix</div>
              <div className="text-gray-400 mt-0.5" style={{ fontSize: 10 }}>Fumigation Service</div>
            </div>
          </div>

          {/* Nav */}
          <div className="flex-1 overflow-y-auto p-2">
            <div className="text-gray-400 uppercase tracking-wider px-2 py-2 font-semibold" style={{ fontSize: 10, letterSpacing: ".08em" }}>Finance</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-1">
              {navItems.map((n) => (
                <button
                  key={n.id}
                  className={`flex items-center gap-2 rounded-lg text-xs font-medium w-full text-left mb-0.5 transition-colors border-0 cursor-pointer ${view === n.id ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 bg-transparent"}`}
                  style={{ padding: "7px 9px" }}
                  onClick={() => setView(n.id)}
                >
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${view === n.id ? "bg-indigo-200 text-indigo-700" : "bg-gray-100 text-gray-400"}`}>
                    <LucideIcon n={n.icon} s={14} />
                  </div>
                  <span className="truncate">{n.label}</span>
                  {n.badge && (
                    <span className="ml-auto bg-red-500 text-white font-semibold rounded-full px-1.5 py-0.5" style={{ fontSize: 9 }}>
                      {n.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-2.5 border-t border-gray-200">
            <div className="bg-gray-100 rounded-lg p-2.5">
              <div className="text-gray-400 uppercase tracking-wider" style={{ fontSize: 10 }}>Active Period</div>
              <div className="text-xs font-semibold text-gray-900 mt-0.5">{PERIOD_LABELS[period] || formatPeriodLabel(period)}</div>
            </div>
          </div>
        </div>

        {/* ── MAIN ── */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">

          {/* Topbar */}
          <div className="bg-white border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between flex-shrink-0 gap-2 px-3 py-2 sm:h-[50px] sm:px-5 sm:py-0">
            <div className="text-xs text-gray-400 flex items-center gap-1.5">
              <span>Finance</span>
              <span className="text-gray-300">›</span>
              <b className="text-gray-900 font-semibold">{VIEW_LABELS[view] || view}</b>
            </div>
            <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-2">
              {user && (
                <div className="flex items-center gap-2 px-2 py-1 border border-gray-200 rounded-lg bg-gray-50 min-w-0">
                  <div className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-bold flex items-center justify-center">
                    {user.name?.charAt(0)?.toUpperCase() ?? "U"}
                  </div>
                  <div className="leading-tight min-w-0">
                    <div className="text-xs font-semibold text-gray-900 truncate max-w-[120px] sm:max-w-none">{user.name}</div>
                    <div className="text-[10px] font-semibold uppercase tracking-wide text-indigo-600 truncate max-w-[120px] sm:max-w-none">{user.role}</div>
                  </div>
                </div>
              )}
              <button
                type="button"
                className={BTN}
                onClick={() => logout()}
              >
                Logout
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-5">
            {view === "journal" && (
              <TransactionJournal
                data={periodData}
                allData={data}
                period={period}
                setPeriod={setPeriod}
                periodOptions={periodOptions}
                onAdd={() => setModal("add")}
                onEdit={(r) => setModal(r)}
                onDelete={(id) => setDelId(id)}
              />
            )}
            {view === "analytics" && <AnalyticsView data={periodData} />}
            {view === "aging" && <AgingView data={periodData} />}
          </div>
        </div>
      </div>

      {/* Modals */}
      {modal && (
        <EntryModal
          key={modal === "add" ? "add" : modal.id}
          initial={modal === "add" ? null : modal}
          onSave={saveEntry}
          onClose={() => setModal(null)}
        />
      )}
      {delId !== null && (
        <DeleteConfirm onConfirm={confirmDelete} onCancel={() => setDelId(null)} />
      )}
    </>
  );
}