import "chart.js/auto";
import { Bar } from "react-chartjs-2";

export default function ExpensesBarChart({ expenses = [], filter = "Daily" }) {

    const groupExpenses = () => {
        const grouped = {};

        expenses.forEach((exp) => {
            const date = new Date(exp.date);

            let key;

            if (filter === "Daily") {
                key = date.toLocaleDateString();
            }

            if (filter === "Weekly") {
                const week = Math.ceil(date.getDate() / 7);

                const startDay = (week - 1) * 7 + 1;
                const endDay = Math.min(startDay + 6, new Date(
                    date.getFullYear(),
                    date.getMonth() + 1,
                    0
                ).getDate());

                const month = date.toLocaleString("default", {
                    month: "short"
                });

                key = `Week ${week} (${month} ${startDay}-${endDay})`;
            }

            if (filter === "Monthly") key = date.toLocaleString("default", {
                month: "short",
                year: "numeric"
            });


            if (filter === "Yearly") key = date.getFullYear();


            grouped[key] =
                (grouped[key] || 0) + Number(exp.amount);
        });

        return grouped;
    };


    const groupedExpenses = groupExpenses();


    const data = {
        labels: Object.keys(groupedExpenses),
        datasets: [
            {
                label: "Amount Spent ($)",
                data: Object.values(groupedExpenses),
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1
            }
        ]
    };


    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top"
            },
            title: {
                display: true,
                text: `${filter} Expenses`,
                font: {
                    size: 25,
                    weight: "bold",
                    family: "Josefin Sans"
                },
                padding: {
                    bottom: 20
                }
            },

        }
    };


    return (
        <div className="min-h-64">
            <Bar
                data={data}
                options={options}
            />
        </div>
    );
}