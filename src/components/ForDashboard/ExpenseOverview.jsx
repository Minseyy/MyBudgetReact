import ExpenseDonutChart from "../../charts/ExpenseDonutChart";
import RecentTable from "../RecentTable";

export default function ExpenseOverview({ expenses }) {

    const transactions = Object.values(expenses || []);

    const totalExpenses = transactions.reduce(
        (acc, curr) => acc + Number(curr.amount),
        0
    );
    return (
        <div className="expenseOverview">
            <p className="text-lg pb-2">
                Total Expenses: ${totalExpenses.toFixed(2)}
            </p>
            <div className="expense-chart min-h-48 align-center flex justify-center items-center py-6">
                <ExpenseDonutChart expenses={transactions} />
            </div>


            <div className="expense-details">
                <RecentTable
                    title="Recent Transactions"
                    data={transactions.slice(-5).reverse()}
                    columns={[
                        {
                            header: "Date",
                            key: "date"
                        },
                        {
                            header: "Category",
                            key: "category"
                        },
                        {
                            header: "Amount",
                            key: "amount",
                            render: (value) => `$${value.toFixed(2)}`
                        }
                    ]}
                />
            </div>

        </div>
    );
}