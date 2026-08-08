import Navbar from "@/components/Navbar";
import BudgetOverview from "@/components/ForDashboard/BudgetOverview";
import WalletCard from "@/components/ForDashboard/WalletCard";
import SavingGoalsCard from "@/components/ForDashboard/SavingsCard";
import ExpenseOverview from "@/components/ForDashboard/ExpenseOverview";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

export default function Dashboard({ data }) {
    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen">

            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-8">

                <h1 className="text-4xl font-bold mb-8">
                    Dashboard
                </h1>

                <section className="mb-8 rounded-full max-h-[400px] ">
                    <Link
                        to="/budgetOverview"
                        className=""
                    >
                        <div className="relative overflow-hidden p-4 shadow-md h-full border-4 [border-image:var(--summary-card-border)_1] rounded-lg">
                            <div className="absolute inset-0 [background:var(--summary-card-bg)] opacity-60"></div>

                            <div className="relative z-10">
                                <h2 className="text-2xl font-semibold mb-4">
                                    Budget Overview
                                </h2>

                                <BudgetOverview
                                    income={data.incomeTotal}
                                    expenses={data.expenseTotal}
                                />
                            </div>
                        </div>
                    </Link>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pt-8 items-center">
                    <Link to="/wallet" className="block w-full">
                        <div className="rounded-lg shadow-sm overflow-visible">
                            <WalletCard
                                wallet={data.wallet}
                                incomeTotal={data.incomeTotal}
                            />
                        </div>
                    </Link>


                    <Link to="/savings" className="block w-full">
                        <div className="paper-card rounded-2xl px-3 py-2 shadow-lg border relative overflow-hidden">
                            <SavingGoalsCard
                                deposits={data.deposits}
                                goals={data.goals}
                                savingTotal={data.savingTotal}
                            />
                        </div>
                    </Link>
                </section>

                <section>
                    <Link
                        to="/expenses"
                        className="block h-full w-full"
                    >
                        <div className="p-4 shadow-md h-full [background:var(--expense-card-bg)]">

                            <h2 className="text-2xl font-semibold mb-4">
                                Expense Overview
                            </h2>

                            <ExpenseOverview
                                expenses={data.transactions}
                            />
                        </div>
                    </Link>
                </section>

            </main>
            <Footer />

        </div>
    );
}