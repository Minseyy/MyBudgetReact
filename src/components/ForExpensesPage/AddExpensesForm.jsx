import { useState } from "react";
import { updateExpense, addExpense } from "@/services/expensesService";
export default function AddExpensesForm({ expense, onClose }) {
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");

    useEffect(() => {
        if (expense) {
            setDate(expense.date ?? "");
            setCategory(expense.category ?? "");
            setAmount(expense.amount ?? "");
        } else {
            setDate("");
            setCategory("");
            setAmount("");
        }
    }, [expense]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const expense = {
                date,
                category,
                amount: Number(amount),
            };
            if (expense) {
                await updateExpense(expense.id, expense);
            } else {
                await addExpense(expense);
            }

            setDate("");
            setCategory("");
            setAmount("");

            onClose?.();
        } catch (error) {
            console.error("Error adding expense:", error);
            alert("Failed to add expense. Please try again.");
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="rounded-xl">
                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label
                            htmlFor="date"
                            className="mb-2 block text-sm font-semibold text-gray-500"
                        >
                            Date
                        </label>

                        <input
                            id="date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full rounded-xl border-2 border-gray-200 bg-gray-100 px-4 py-3 text-gray-700 transition-all focus:border-purple-500 focus:bg-white focus:outline-none"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="category"
                            className="mb-2 block text-sm font-semibold text-gray-500"
                        >
                            Category
                        </label>

                        <input
                            id="category"
                            type="text"
                            placeholder="Food"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full rounded-xl border-2 border-gray-200 bg-gray-100 px-4 py-3 text-gray-700 placeholder:text-gray-400 transition-all focus:border-purple-500 focus:bg-white focus:outline-none"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="amount"
                            className="mb-2 block text-sm font-semibold text-gray-500"
                        >
                            Amount
                        </label>

                        <input
                            id="amount"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full rounded-xl border-2 border-gray-200 bg-gray-100 px-4 py-3 text-gray-700 placeholder:text-gray-400 transition-all focus:border-purple-500 focus:bg-white focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-[var(--button-active)] py-3 font-semibold text-white transition hover:bg-purple-600"
                        onClick={() => {
                            if (!date || !category || !amount) {
                                alert("Please fill in all fields.");
                                return;
                            }
                            if (isNaN(amount) || Number(amount) <= 0) {
                                alert("Please enter a valid amount.");
                                return;
                            }
                        }}
                    >
                        {expense ? "Update Expense" : "Add Expense"}
                    </button>

                </form>
            </div>
        </div>
    );
}