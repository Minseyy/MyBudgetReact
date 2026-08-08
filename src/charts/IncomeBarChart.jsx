import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

export default function IncomeBarChart({ incomes = [] }) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const incomeByMonth = incomes.reduce((acc, income) => {
        const month = new Date(income.date).toLocaleString("en-AU", {
            month: "short",
        });

        acc[month] = (acc[month] || 0) + Number(income.amount);

        return acc;
    }, {});

    const data = {
        labels: months,
        datasets: [
            {
                label: "Income Over Time",
                data: months.map(month => incomeByMonth[month] || 0),
                backgroundColor: "#882df133",
                tension: 0.4,
                fill: true,

            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false
    };

    return (
        <div className="h-64">
            <Bar data={data} options={options} />
        </div>
    );
}