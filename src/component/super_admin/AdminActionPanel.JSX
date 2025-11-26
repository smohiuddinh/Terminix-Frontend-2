import { useState } from "react";

export default function AdminActionPanel() {
  const [loading, setLoading] = useState(false);
  const [outcome, setOutcome] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const handleAction = (action) => {
    setLoading(true);
    setTimeout(() => {
      alert(`Action: ${action}\nOutcome: ${outcome}\nAmount: ${amount}\nNote: ${note}`);
      setLoading(false);
    }, 800); // fake delay for demo
  };

  return (
    <div className="sticky top-4 border rounded-lg shadow-md bg-white">
      <div className="p-4 space-y-4">
        <h2 className="text-lg font-semibold">Admin Actions</h2>

        {/* Quick Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={() => handleAction("under_review")}
            className="w-full px-4 py-2 bg-yellow-200 hover:bg-yellow-300 rounded-md"
          >
            Mark UNDER_REVIEW
          </button>
          <button
            onClick={() => handleAction("request_info")}
            className="w-full px-4 py-2 bg-blue-200 hover:bg-blue-300 rounded-md"
          >
            Request More Info
          </button>
          <button
            onClick={() => handleAction("propose_settlement")}
            className="w-full px-4 py-2 bg-purple-200 hover:bg-purple-300 rounded-md"
          >
            Propose Settlement
          </button>
          <button
            onClick={() => handleAction("escalate")}
            className="w-full px-4 py-2 bg-red-200 hover:bg-red-300 rounded-md"
          >
            Escalate to Arbitration
          </button>
        </div>

        {/* Resolution Form */}
        <div className="border-t pt-3">
          <h3 className="font-medium mb-2">Resolution Form</h3>
          <select
            value={outcome}
            onChange={(e) => setOutcome(e.target.value)}
            className="w-full border p-2 rounded mb-2"
          >
            <option value="">Select Outcome</option>
            <option value="full_refund">Full Refund</option>
            <option value="partial_refund">Partial Refund</option>
            <option value="release_funds">Release Funds to Freelancer</option>
            <option value="reassign_milestone">Reassign Milestone</option>
            <option value="penalize_fee">Penalize Fee</option>
          </select>

          {outcome === "partial_refund" && (
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter refund amount"
              className="w-full border p-2 rounded mb-2"
            />
          )}

          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add admin notes..."
            className="w-full border p-2 rounded mb-2"
          />

          <button
            onClick={() => handleAction("resolve")}
            disabled={loading}
            className="w-full px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Resolve Dispute"}
          </button>
        </div>
      </div>
    </div>
  );
}
