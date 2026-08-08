import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HistoryPage from "../History";

export default function WalletHistory({
    incomes = [],
    incomeTotal = 0,
}) {
    return (
        <div className="min-h-screen">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-8">
                <HistoryPage
                    records={incomes}
                    total={incomeTotal}
                    totalLabel="Total Income"
                    title="Income History"
                    searchPlaceholder="🔍︎ Search income source..."
                    searchField="source"
                    backRoute="/wallet"
                    columns={[
                        {
                            header: "Date",
                            key: "date",
                        },
                        {
                            header: "Source",
                            key: "source",
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