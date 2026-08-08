import { useEffect, useState } from "react";
import { addSavings, updateSavings } from "../../services/savingsService";
import { addGoal } from "../../services/goalService";

export default function AddDepositsForm({
    goals = [],
    saving = null,
    onClose,
}) {
    const [date, setDate] = useState("");
    const [savingCategory, setSavingCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [customGoal, setCustomGoal] = useState("");

    // Populate form when editing
    useEffect(() => {
        if (saving) {
            setDate(saving.date ?? "");
            setSavingCategory(saving.goalId ?? "");
            setAmount(saving.amount ?? "");
        } else {
            // Blank form for adding
            setDate("");
            setSavingCategory("");
            setAmount("");
            setCustomGoal("");
        }
    }, [saving]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let goalId = savingCategory;

            // Create new goal
            if (savingCategory === "other") {
                if (!customGoal.trim()) {
                    alert("Please enter a goal name.");
                    return;
                }

                const newGoal = {
                    name: customGoal.trim(),
                    targetAmount: 0,
                };

                // Firebase key of the newly created goal
                goalId = await addGoal(newGoal);
            }

            if (!goalId) {
                alert("Please select a goal.");
                return;
            }

            const savingData = {
                date,
                goalId,
                amount: Number(amount),
            };

            if (saving) {
                // EDIT existing deposit
                await updateSavings(saving.id, savingData);
            } else {
                // ADD new deposit
                await addSavings(savingData);
            }

            // Reset
            setDate("");
            setSavingCategory("");
            setCustomGoal("");
            setAmount("");

            onClose?.();

        } catch (error) {
            console.error(
                saving
                    ? "Error updating savings:"
                    : "Error adding savings:",
                error
            );
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="rounded-xl">
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Date */}
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

                    {/* Goal */}
                    <div>
                        <label
                            htmlFor="savingCategory"
                            className="mb-2 block text-sm font-semibold text-gray-500"
                        >
                            Goal
                        </label>

                        <select
                            id="savingCategory"
                            value={savingCategory}
                            onChange={(e) => setSavingCategory(e.target.value)}
                            className="w-full rounded-xl border-2 border-gray-200 bg-gray-100 px-4 py-3 text-gray-700 transition-all focus:border-purple-500 focus:bg-white focus:outline-none"
                        >
                            <option value="">
                                Select a goal
                            </option>

                            {goals.map((goal) => (
                                <option
                                    key={goal.id}
                                    value={goal.id}
                                >
                                    {goal.name}
                                </option>
                            ))}

                            <option value="other">
                                Other...
                            </option>
                        </select>

                        {savingCategory === "other" && (
                            <input
                                id="customGoal"
                                type="text"
                                placeholder="Enter your own goal"
                                value={customGoal}
                                onChange={(e) =>
                                    setCustomGoal(e.target.value)
                                }
                                className="mt-3 w-full rounded-xl border-2 border-gray-200 bg-gray-100 px-4 py-3 text-gray-700 placeholder:text-gray-400 transition-all focus:border-purple-500 focus:bg-white focus:outline-none"
                            />
                        )}
                    </div>

                    {/* Amount */}
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
                            onChange={(e) =>
                                setAmount(e.target.value)
                            }
                            className="w-full rounded-xl border-2 border-gray-200 bg-gray-100 px-4 py-3 text-gray-700 placeholder:text-gray-400 transition-all focus:border-purple-500 focus:bg-white focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-[var(--button-active)] py-3 font-semibold text-white transition hover:bg-purple-600"
                    >
                        {saving ? "Save Changes" : "Add Savings"}
                    </button>

                </form>
            </div>
        </div>
    );
}
