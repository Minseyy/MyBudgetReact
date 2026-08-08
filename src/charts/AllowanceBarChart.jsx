import "chart.js/auto";
import { Bar } from "react-chartjs-2";

export default function AllowanceBarChart({ spent = 0, wallet = {} }) {

    const allowance = Number(wallet.allowance ?? 0);

    const data = {
        labels: ["Allowance", "Spent"],
        datasets: [
            {
                label: "Allowance",
                data: [allowance, null],
                backgroundColor: "#f9c5d1",
                stack: "budget",
            },
            {
                label: "Spent",
                data: [null, spent],
                backgroundColor: "#ff6b81",
                stack: "budget",
            },
            {
                label: "Remaining",
                data: [null, Math.max(allowance - spent, 0)],
                backgroundColor: "#8b5cf6",
                stack: "budget",
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Allowance vs Spent",
            },
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="h-64">
            <Bar
                data={data}
                options={options}
            />
        </div>
    );
}