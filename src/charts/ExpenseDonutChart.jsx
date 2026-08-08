import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Doughnut } from "react-chartjs-2";
import CustomLegend from "../components/ForDashboard/CustomLegend";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

export default function ExpenseDonutChart({ expenses }) {

    const categoryTotals = expenses.reduce((acc, expense) => {
        const category = expense.category;

        acc[category] = (acc[category] || 0) + Number(expense.amount);

        return acc;
    }, {});


    const data = {
        labels: Object.keys(categoryTotals),
        datasets: [
            {
                label: "Expenses",
                data: Object.values(categoryTotals),
                backgroundColor: [
                    "#B077EC",
                    "#F7C678",
                    "#9EE5FF",
                    "#FFB4C2",
                    "#A8E6CF"
                ],
                borderWidth: 0
            }
        ]
    };


    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
                
            }
        }
    };


    return (
        <div className="flex items-center gap-8">

            <div className="w-64 h-64">
                <Doughnut 
                    data={data}
                    options={options}
                />
            </div>


            <CustomLegend
                labels={data.labels}
                colors={data.datasets[0].backgroundColor}
                values={data.datasets[0].data}
            />

        </div>
    );
}