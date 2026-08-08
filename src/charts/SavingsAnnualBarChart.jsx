import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

export default function SavingsAnnualBarChart({ deposits }) {

    const monthlySavings = deposits.reduce((acc, deposits) => {
        const month = new Date(deposits.date).toLocaleString(
            "en-AU",
            {month: "short"}
        );

        acc[month] = (acc[month] || 0) + Number(deposits.amount);

        return acc;
    }, {});

    const months = ["Jan", "Feb", "Mar", "Apr", "May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

    const data = {
        labels: months,
        datasets: [
            {
                label: 'Saved Amount ($)',
                data: Object.values(monthlySavings),
                backgroundColor: "#B077EC",  // TODO: change to palette of 12 colors!
                borderWidth: 0
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Savings Overview'
            }
        }
    };


    return (
        <Bar
            data={data}
            options={options}
        />
    );
}
