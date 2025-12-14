"use client";

import { useState } from "react";
import { Info, X, ChevronDown, ChevronUp } from "lucide-react";

export function TaxDeductionInfo() {
  const [open, setOpen] = useState(false);
  const [showBrackets, setShowBrackets] = useState(false);
  const [donation, setDonation] = useState(10000);
  const [bracket, setBracket] = useState(35);

  const estimatedSavings = Math.round(donation * (bracket / 100));
  const afterTaxCost = donation - estimatedSavings;

  return (
    <>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1 underline decoration-dotted underline-offset-4 hover:text-foreground"
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
            <p className="text-xs text-muted-foreground mb-4">
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
                  <option value={35}>35%</option>
                </select>
              </div>

              {/* Results */}
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
                    ${afterTaxCost.toLocaleString()}
                  </span>
                  .
                </div>
              </div>
            </div>

            {/* Expandable: What is a tax bracket */}
            <button
              onClick={() => setShowBrackets(!showBrackets)}
              className="mt-4 inline-flex items-center gap-1 text-xs underline underline-offset-4 text-muted-foreground hover:text-foreground"
            >
              What is a tax bracket?
              {showBrackets ? (
                <ChevronUp className="h-3 w-3" />
              ) : (
                <ChevronDown className="h-3 w-3" />
              )}
            </button>

            {showBrackets && (
              <div className="mt-3 rounded-lg bg-muted/40 p-3 text-[11px] text-muted-foreground space-y-2">
                <p>
                  Your tax bracket is the rate applied to your highest dollars
                  of income. Higher brackets mean larger tax savings from
                  deductions.
                </p>

                <p className="font-medium text-foreground">
                  Approximate federal tax brackets (single filers):
                </p>

                <ul className="space-y-1">
                  <li>• 12%: roughly $11,600 – $47,150</li>
                  <li>• 22%: roughly $47,150 – $100,525</li>
                  <li>• 35%: roughly $243,725 – $609,350</li>
                </ul>

                <p>
                  These ranges are approximate and change over time.  
                  Your actual bracket depends on income, filing status,
                  and deductions.
                </p>
              </div>
            )}

            {/* Legal note */}
            <p className="mt-3 text-[11px] italic text-muted-foreground">
              This is an estimate, not tax advice.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
