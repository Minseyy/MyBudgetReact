import Navbar from "@/components/Navbar";
import RecentTable from "@/components/RecentTable";
import SavingsAnnualBarChart from "@/charts/SavingsAnnualBarChart";
import AddDepositsForm from "@/components/ForSavingsPage/AddDepositsForm";
import GoalsGrid from "@/components/GoalsGrid";
import SlideUpModal from "@/components/SlideUpModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Savings({ savings = [], savingTotal = 0, goals = [] }) {
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();
    return (
        <div className="min-h-screen">

            <Navbar />

            <main className="savings max-w-7xl mx-auto px-6 py-8">

                <h1 className="text-4xl font-bold mb-8">
                    Savings
                </h1>
                <p>Total Savings: ${savingTotal.toFixed(2)}</p>
            </main>

            {/* Savings Bar Chart - annual */}
            <div className="savings-chart max-w-7xl mx-auto px-6 py-8">
                <h2 className="text-2xl font-semibold mb-4">
                    Savings Overview
                </h2>
                <div className="chart-container h-96 bg-[var(--savings-card-bg)] p-4 rounded-lg shadow-md">
                    <SavingsAnnualBarChart deposits={savings} />
                </div>
            </div>

            {/* Recent Savings Transactions */}
            <div className="recent-savings max-w-7xl mx-auto px-6 py-8">
                <div className="flex justify-end mb-3">
                    <button className="px-4 py-2 rounded-lg bg-[var(--button-active)] hover: text-white"
                        onClick={() => setOpenModal(true)}
                    >
                        + Deposit New Savings
                    </button>
                </div>
                <div className="text-lg">
                    {savings.length === 0 ? (
                        "No recent savings transactions to display."
                    ) : (
                        <RecentTable
                            title="Recent Savings"
                            data={savings.slice(-5).reverse()}
                            columns={[
                                {
                                    header: "Date",
                                    key: "date"
                                },
                                {
                                    header: "Savings Category",
                                    key: "goalId",
                                    render: (goalId) => {
                                        const goal = goals.find(g => g.id === goalId);
                                        return goal ? goal.name : "-";
                                    }
                                },
                                {
                                    header: "Amount",
                                    key: "amount",
                                    render: (value) => `$${Number(value).toFixed(2)}`
                                }
                            ]}
                        />
                    )}
                </div>

                <div className="flex justify-center my-2">
                    <button className="px-4 py-2 w-full rounded-lg bg-[var(--button-active)] hover: text-white"
                        onClick={() => navigate("/savings/history")}>
                        View All Saving Deposits
                    </button>
                </div>

                {/* Goals Overview -> GoalPage too */}
                <div>
                    <GoalsGrid goals={goals} deposits={savings} />
                </div>


                <div className="container">
                    <SlideUpModal
                        isOpen={openModal}
                        onClose={() => setOpenModal(false)}
                        title="Add Savings"
                    >
                        <AddDepositsForm goals={goals} onClose={() => setOpenModal(false)} />
                    </SlideUpModal>
                </div>
            </div>

        </div>
    );
}