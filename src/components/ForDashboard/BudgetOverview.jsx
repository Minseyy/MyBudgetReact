import IncomeExpenseChart from "../../charts/IncomeExpenseChart";

export default function BudgetOverview({ income, expenses }) {

    return (
        <div className="budgetOverview grid grid-cols-3 gap-4 items-center p-4 min-h-[300px] ">

            {/* Chart Section */}
            <div className="col-span-2 h-[300px] mr-3 bg-white/15 backdrop-blur-xl shadow-md rounded-xl p-2">
                <p className="text-md opacity-60 mb-2 text-center font-bold">
                    Cash Flow
                </p>
                <IncomeExpenseChart
                    income={income}
                    expenses={expenses}
                />
            </div>

            {/* Summary Section */}
            <div className="rounded-3xl bg-black/5 backdrop-blur-xl p-5 border border-white/30 shadow-xl m-2">

                <p className="text-sm opacity-60 mb-4  font-bold">
                    Monthly Summary
                </p>

                <div className="space-y-3">

                    <div className="bg-[var(--summary-card1-accent)] rounded-xl p-4">
                        <span>Income</span>
                        <p className="text-3xl">${income}</p>
                    </div>

                    <div className="bg-[var(--summary-card2-accent)]  rounded-xl p-4">
                        <span>Expenses</span>
                        <p className="text-3xl">${expenses}</p>
                    </div>

                </div>

            </div>

        </div>
    );
}