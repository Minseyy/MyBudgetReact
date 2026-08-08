import ProgressCircle from "./ProgressCircle";

export default function GoalsGrid({ goals = [], deposits = [] }) {

    return (
        <div className="grid grid-cols-5 gap-6 justify-center">
            {goals.map((goal) => {

                const depositForGoal = deposits
                    .filter((deposit) => deposit.goalId === goal.id)
                    .reduce(
                        (sum, deposit) => sum + Number(deposit.amount),
                        0
                    );

                const targetAmount = Number(goal.targetAmount || 0);

                const percentage =
                    targetAmount > 0
                        ? Math.min(
                            (depositForGoal / targetAmount) * 100,
                            100
                        )
                        : 0;

                return (
                    <div
                        key={goal.id}
                        className="rounded-xl bg-white p-4 shadow min-h-32"
                    >
                        <div className="mb-5 text-center bg-black/20">
                            <h3 className="text-lg font-bold text-gray-800">
                                {goal.name}
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                ${depositForGoal.toFixed(2)} / $
                                {targetAmount.toFixed(2)}
                            </p>
                        </div>

                        <ProgressCircle
                            percentage={percentage}
                            label={goal.name}
                        />
                    </div>
                );
            })}
        </div>
    );
}