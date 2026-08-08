import Navbar from "@/components/Navbar";
import ExpenseDonutChart from "../../charts/ExpenseDonutChart";
import RecentTable from "../../components/RecentTable";
import ExpensesComparisons from "../../components/ForExpensesPage/ExpensesComparisons";
import Footer from "@/components/Footer";
import AddExpensesForm from "../../components/ForExpensesPage/AddExpensesForm";
import { useState } from "react";
import SlideUpModal from "@/components/SlideUpModal";
import { useNavigate } from "react-router-dom";

export default function Expenses({ expenses = [], expensesTotal = 0 }) {
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();
    return (
        <div className="min-h-screen w-full overflow-x-hidden">

            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-8">
                <h1 className="text-4xl font-bold mb-8">
                    Expenses
                </h1>

                <h2 className="text-center">Expenses Overview</h2>
                <div className="[background:var(--bg-shadow)] shadow rounded mb-10">
                    <ExpensesComparisons expenses={expenses} />
                </div>

                <div className="h-px bg-[#E8D0CD]/50 w-full my-4"></div>

                <h2 className="py-5 text-center">Expenses Breakdown</h2>

                <div className="flex flex-row items-center p-8 gap-10 my-10">

                    <div className="expense-chart flex-1 min-w-0 min-h-[250px] flex justify-center items-center py-6 my-8">
                        <ExpenseDonutChart expenses={expenses} />
                    </div>
                    <div className="flex-1 bg-white/70 rounded-xl shadow-[var(--shadow)] p-5 my-8 flex items-center w-full min-w-0">
                        <div>
                            <p className="text-[#6b6375]">
                                Total Expenses
                            </p>
                            <p className="text-4xl text-pink-900">
                                ${expensesTotal.toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="expense-details px-10 py-5">
                    <div className="flex justify-end mb-3">
                        <button className="px-4 py-2 rounded-lg bg-[var(--button-active)] hover:bg-purple-600 text-white" onClick={() => setOpenModal(true)}>
                            + Add Expenses
                        </button>
                    </div>

                    <RecentTable
                        title="Recent Transactions"
                        data={expenses.slice(-5).reverse()}
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
                    <div className="flex justify-center my-2">
                        <button className="px-4 py-2 w-full rounded-lg bg-[var(--button-active)] hover: text-white"
                            onClick={() => navigate("/expenses/history")}>
                            View All Transaction
                        </button>
                    </div>

                    <div className="container">
                        <SlideUpModal
                            isOpen={openModal}
                            onClose={() => setOpenModal(false)}
                            title="Add Expenses"
                        >
                            <AddExpensesForm />
                        </SlideUpModal>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}