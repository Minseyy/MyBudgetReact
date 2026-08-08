import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RecentTable from "@/components/RecentTable";
import WalletDashboard from "@/components/ForWalletPage/WalletDashboard";
import AllowanceBarChart from "../../charts/AllowanceBarChart";
import IncomeSourcePieChart from "../../charts/IncomeSourcePieChart";
import IncomeBarChart from "../../charts/IncomeBarChart";
import AddIncomeForm from "../../components/ForWalletPage/AddIncomeForm";
import { useState } from "react";
import SlideUpModal from "@/components/SlideUpModal";
import { Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

export default function Wallet({ wallet = [], incomes = [], incomeTotal = 0, spent = 0 }) {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    return (
        <div className="min-h-screen">

            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-8">

                <h1 className="text-4xl font-bold mb-8">
                    Wallet
                </h1>



                <div className="justify-center items-center">
                    <div className="grid grid-cols-2 gap-10 px-10 items-stretch mb-10">

                        <div className="h-64">
                            <WalletDashboard
                                wallet={wallet}
                                spent={spent}
                            />
                        </div>

                        <div className="h-64">
                            <IncomeSourcePieChart
                                incomes={incomes}
                            />
                        </div>

                    </div>


                    <div className="grid grid-cols-1 px-10">
                        <div className="rounded-2xl bg-white/70 px-8 py-6 shadow-[var(--shadow)]">
                            <p className="text-sm font-semibold text-gray-500">
                                Total Income
                            </p>

                            <p className="mt-1 text-4xl font-bold text-pink-900">
                                ${incomeTotal.toFixed(2)}
                            </p>
                        </div>

                        <hr className="my-6 border-[#E8D0CD]/50" />

                        {/* Income Chart */}
                        <div className="rounded-2xl bg-white/70 p-6 shadow-[var(--shadow)]">
                            <IncomeBarChart incomes={incomes} />
                        </div>

                    </div>
                </div>

                <div className="wallet-details px-10 py-5 ">
                    <div className="flex justify-end mb-3">
                        <button className="px-4 py-2 rounded-lg bg-[var(--button-active)] hover: text-white"
                            onClick={() => setOpenModal(true)} >
                            + Add Income
                        </button>
                    </div>
                    <RecentTable
                        title="Incomes Record"
                        data={incomes.slice(-5).reverse()}
                        columns={[
                            {
                                header: "Date",
                                key: "date"
                            },
                            {
                                header: "Amount",
                                key: "amount",
                                render: (value) => `$${value.toFixed(2)}`
                            },
                            {
                                header: "Source",
                                key: "source"
                            }
                        ]}
                    />

                    <div className="flex justify-center my-2">
                        <button className="px-4 py-2 w-full rounded-lg bg-[var(--button-active)] hover: text-white"
                            onClick={() => navigate("/wallet/history")}>
                            View All Income Record
                        </button>
                    </div>
                </div>
                <div className="container">
                    <SlideUpModal
                        isOpen={openModal}
                        onClose={() => setOpenModal(false)}
                        title="Add Expense"
                    >
                        <AddIncomeForm />
                    </SlideUpModal>
                </div>
            </main>

        </div>
    );
}