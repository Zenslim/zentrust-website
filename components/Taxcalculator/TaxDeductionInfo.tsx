"use client";

import { useState } from "react";
import { Info, X } from "lucide-react";

export function TaxDeductionInfo() {
  const [open, setOpen] = useState(false);
  const [donation, setDonation] = useState(10000);
  const [bracket, setBracket] = useState(22);

  const estimatedSavings = Math.round(donation * (bracket / 100));

  return (
    <>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1 underline decoration-dotted underline-offset-4 text-muted-foreground hover:text-foreground"
      >
        Tax-deductible
        <Info className="h-4 w-4" />
      </button>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-background p-5 shadow-xl">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">
                How tax deductibility works (U.S.)
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Explanation */}
            <p className="text-xs text-muted-foreground mb-3">
              Your donation reduces your taxable income.  
              Your actual tax savings depend on your tax bracket.
            </p>

            {/* Mini Calculator */}
            <div className="space-y-3 rounded-xl bg-muted/40 p-4 text-xs">
              <div className="flex items-center justify-between">
                <label>Donation amount</label>
                <input
                  type="number"
                  min={0}
                  value={donation}
                  onChange={(e) => setDonation(Number(e.target.value))}
                  className="w-28 rounded-md border bg-background px-2 py-1 text-right"
                />
              </div>

              <div className="flex items-center justify-between">
                <label>Tax bracket</label>
                <select
                  value={bracket}
                  onChange={(e) => setBracket(Number(e.target.value))}
                  className="rounded-md border bg-background px-2 py-1"
                >
                  <option value={12}>12%</option>
                  <option value={22}>22%</option>
                  <option value={24}>24%</option>
                  <option value={32}>32%</option>
                  <option value={35}>35%</option>
                  <option value={37}>37%</option>
                </select>
              </div>

             <div className="pt-3 border-t space-y-3">
  <div className="text-foreground">
    Estimated federal tax savings
    <div className="text-lg font-semibold">
      ${estimatedSavings.toLocaleString()}
    </div>
  </div>

  {/* Clarity line */}
  <div className="rounded-lg bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
    Your donation remains{" "}
    <span className="font-medium text-foreground">
      ${donation.toLocaleString()}
    </span>
    . After estimated tax savings, the cost to you is about{" "}
    <span className="font-medium text-foreground">
      ${(donation - estimatedSavings).toLocaleString()}
    </span>
    .
  </div>
</div>

            {/* Legal clarity */}
            <p className="mt-3 text-[11px] text-muted-foreground">
              Cash contributions to a 501(c)(3) public charity are generally
              deductible up to 60% of income for eligible U.S. donors.
              Actual benefits depend on individual circumstances.
            </p>

            <p className="mt-1 text-[11px] italic text-muted-foreground">
              This is an estimate, not tax advice.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
