import { useState } from "react";
import ExpensesBarChart from "../../charts/ExpensesBarChart";

export default function ExpensesComparisons({ expenses = [] }) {
    const filters = ["Daily", "Weekly", "Monthly", "Yearly"];
    const [filter, setFilter] = useState("Daily");

    return (
        <div className="p-5 m-5">
            <div className="flex justify-end mb-4">
                <div className="relative flex bg-white/70 backdrop-blur-sm p-1 rounded-full shadow-md border border-[#E8D0CD]">

                    <div
                        className="absolute top-1 bottom-1 left-1 w-20 rounded-full bg-[var(--button-active)] shadow-md transition-transform duration-300 ease-in-out"
                        style={{
                            transform: `translateX(${filters.indexOf(filter) * 80}px)`
                        }}
                    />

                    {filters.map((item) => (
                        <button
                            key={item}
                            onClick={() => setFilter(item)}
                            className={`relative z-10 w-20 py-1 rounded-full text-sm transition-colors duration-300 ${filter === item
                                    ? "text-white"
                                    : "text-[#6b6375]"
                                }`}
                        >
                            {item}
                        </button>
                    ))}

                </div>
            </div>

            <div className="p-5">
                <ExpensesBarChart expenses={expenses} filter={filter} />
            </div>
        </div>
    );
}