import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Wallet from "./pages/Wallet/Wallet";
import Expenses from "./pages/Expenses/Expenses.jsx";
import Savings from "./pages/Savings/Savings";
import Goals from "./pages/Goals";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings.jsx";
import WalletHistory from "./pages/Wallet/WalletHistory.jsx";
import  useBudgetData  from "./hooks/useBudgetData";
import ExpensesHistory from "./pages/Expenses/ExpensesHistory.jsx";
import SavingsHistory from "./pages/Savings/SavingsHistory.jsx";

export default function App() {

    const data = useBudgetData();

    if (!data) {
        return <div>Loading...</div>;
    }
    return (
        <BrowserRouter basename="/MyBudgetReact">
            <Routes>
                <Route path="/" element={<Dashboard data={data} />} />
                <Route path="/expenses" element={<Expenses expensesTotal={data.expenseTotal } expenses = {data.transactions} />} />
                <Route path="/expenses/history" element={<ExpensesHistory transactions={data.transactions} expenseTotal={data.expenseTotal}/>} />
                <Route path="/goals" element={<Goals depostis= {data.deposits} goals={data.goals} savingsTotal={data.savingTotal}/>} />
                <Route path="/wallet" element={<Wallet incomes={data.incomes} incomeTotal={data.incomeTotal} wallet={data.wallet} spent={data.expenseTotal}/>} />
                <Route path="/wallet/history" element={<WalletHistory incomes={data.incomes} incomeTotal={data.incomeTotal}/>} />
                <Route path="/savings" element={<Savings savings={data.deposits} savingsTotal={data.savingTotal} goals={data.goals} />} />
                <Route path="/savings/history" element={<SavingsHistory savings={data.deposits} savingTotal={data.savingTotal} goals={data.goals}/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </BrowserRouter>

    )
}