import { useState } from "react";
import { addIncome } from "../../services/incomeService";

export default function AddIncomeForm({ onClose }) {
    const [date, setDate] = useState("");
    const [source, setSource] = useState("");
    const [amount, setAmount] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const income = {
            date,
            amount: Number(amount),
            source
        };

        try {
            await addIncome(income);

            setDate("");
            setSource("");
            setAmount("");

            onClose();
        } catch (error) {
            console.error("Error adding income:", error);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="rounded-xl px-10 py-5 bg-white shadow-md">
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
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="source"
                            className="mb-2 block text-sm font-semibold text-gray-500"
                        >
                            Source
                        </label>

                        <input
                            id="source"
                            type="text"
                            placeholder="Salary"
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                            className="w-full rounded-xl border-2 border-gray-200 bg-gray-100 px-4 py-3 text-gray-700 placeholder:text-gray-400 transition-all focus:border-purple-500 focus:bg-white focus:outline-none"
                            required
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
                            min="0"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full rounded-xl border-2 border-gray-200 bg-gray-100 px-4 py-3 text-gray-700 placeholder:text-gray-400 transition-all focus:border-purple-500 focus:bg-white focus:outline-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-[var(--button-active)] py-3 font-semibold text-white transition hover:bg-purple-600"
                    >
                        Add Income
                    </button>

                </form>
            </div>
        </div>
    );
}