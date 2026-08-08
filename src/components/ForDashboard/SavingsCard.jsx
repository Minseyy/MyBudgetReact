import ProgressCircle from "../ProgressCircle";
import { useState } from "react";

export default function SavingGoalsCard({ deposits = [], savingTotal = 0, goals = [] }) {

    const [animateKey, setAnimateKey] = useState(0);
    const [hovered, setHovered] = useState(false);

    const goalsProgress = goals.map((goal) => {

        const accumulated = deposits
            .filter(({ goalId }) => goalId === goal.id)
            .reduce(
                (sum, deposit) => sum + Number(deposit.amount),
                0
            );

        const progress = goal.targetAmount
            ? Number(((accumulated / goal.targetAmount) * 100).toFixed(1))
            : 0;

        return {
            ...goal,
            accumulated,
            progress
        };
    });


    const topGoals = [...goalsProgress]
        .sort((a, b) => b.progress - a.progress)
        .slice(0, 3);


    const replayAnimation = () => {
        if (!hovered) {
            setAnimateKey(prev => prev + 1);
            setHovered(true);
        }
    };


    return (
        <div
            className="savingsCard rounded-2xl px-8 py-4 overflow-hidden"
            onMouseEnter={replayAnimation}
            onMouseLeave={() => setHovered(false)}
        >

            <div className="absolute left-0 top-0 h-full w-4 [background:var(--saving-cards-border)]" />

            <h2>Savings</h2>

            <div className="rounded-xl px-5 py-2 border border-dashed border-[#c9ad82] [background:#fff8e8]">
                <p className="text-sm text-[#80664a]">
                    Total Savings
                </p>

                <p className="text-2xl my-1 text-[#5b3a29] font-semibold">
                    ${savingTotal ? savingTotal.toFixed(2) : '0.00'}
                </p>
            </div>


            <div className="flex justify-center gap-4">
                {topGoals.map((goal, index) => (
                    <ProgressCircle
                        key={goal.id}
                        percentage={Math.min(goal.progress, 100)}
                        label={goal.name}
                        index={index}
                        animateKey={animateKey}
                    />
                ))}
            </div>

        </div>
    );
}