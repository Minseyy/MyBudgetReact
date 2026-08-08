import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

export default function IncomeExpenseChart({ income, expenses }) {

    const data = {
        labels: ['Income', 'Expenses'],
        datasets: [
            {
                label: 'Amount ($)',
                data: [income, expenses],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false,
                // text: 'Cash Flow'
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