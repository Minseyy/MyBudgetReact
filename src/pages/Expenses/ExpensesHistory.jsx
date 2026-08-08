import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HistoryPage from "../History";

export default function ExpensesHistory({
    transactions = [],
    expenseTotal = 0,
}) {
    return (
        <div className="min-h-screen"
        >
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-8">
                <HistoryPage
                    records={transactions}
                    total={expenseTotal}
                    totalLabel="Total Expenses"
                    title="Expense History"
                    searchPlaceholder="🔍︎ Search expense category..."
                    searchField="category"
                    backRoute="/expenses"
                    columns={[
                        {
                            header: "Date",
                            key: "date",
                        },
                        {
                            header: "Category",
                            key: "category",
                        },
                        {
                            header: "Amount",
                            key: "amount",
                            render: (value) =>
                                `$${Number(value).toFixed(2)}`,
                        },
                    ]}
                />
            </main>
            <Footer />
        </div>
    );
}