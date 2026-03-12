
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Calendar } from "lucide-react";

export default function SaleForm({ departmentId, initialData, onSubmit, onCancel }) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      date: initialData?.date || new Date().toISOString().split('T')[0],
      amount: initialData?.amount || "",
    },
  });

  const handleFormSubmit = (data) => {
    const payload = {
      ...data,
      amount: parseFloat(data.amount) || 0,
      status: 'Paid', // Default status
    };
    
    console.log("Sale Form Submitted:", payload);
    console.log("Department ID:", departmentId);
    
    // Call onSubmit to update state and close modal
    onSubmit(payload);
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 space-y-6"
      >
        {/* Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500 w-5 h-5" />
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-400 outline-none"
                  required
                />
              )}
            />
          </div>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-semibold text-emerald-600">
              Rs.
            </span>
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  step="0.01"
                  placeholder="Enter amount"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-400 outline-none"
                  required
                />
              )}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold shadow-lg hover:from-emerald-700 hover:to-teal-700 transition"
          >
            {initialData ? 'Update Sale' : 'Add Sale'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}