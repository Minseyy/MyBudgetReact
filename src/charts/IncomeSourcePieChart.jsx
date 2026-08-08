import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    ChartDataLabels
);

ChartJS.register(ArcElement, Tooltip, Legend);

export default function IncomeSourcePieChart({ incomes = [] }) {
    const incomeBySource = incomes.reduce((acc, income) => {
        const source = income.source || "Other";

        acc[source] = (acc[source] || 0) + Number(income.amount);

        return acc;
    }, {});

    const data = {
        labels: Object.keys(incomeBySource),
        datasets: [
            {
                label: 'Income Source',
                data: Object.values(incomeBySource),
                backgroundColor: [
                    "#882df1",
                    "#c99afb",
                    "#ff6b81",
                    "#eadbc8",
                ],
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: "Income Sources",
            },
            datalabels: {
                color: "#fff",
                textAlign: "center",
                anchor: "center",
                align: "center",
                font: {
                    family: "M PLUS 1",
                    size: 12,
                    weight: "normal",
                },
                formatter: (value, context) => {
                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                    const percentage = ((value / total) * 100).toFixed(0);

                    return `${context.chart.data.labels[context.dataIndex]}\n${percentage}%`;
                },
            },
        },
    };
    return (
        <div className="h-full rounded-2xl p-4 shadow [background:var(--bg-shadow)] flex flex-col">

            <div className="flex-1 relative">
                <Pie data={data} options={options} />
            </div>

        </div>
    );
}