import { useEffect, useState } from "react";

export default function ProgressCircle({ percentage, index = 0, label, animateKey }) {

    const [animatedPercentage, setAnimatedPercentage] = useState(0);

    const colors = [
        "#B077EC",
        "#F7C678",
        "#9EE5FF",
        "#FFB4C2",
        "#A8E6CF"
    ];

    const color = colors[index % colors.length];

    const radius = 38;
    const circumference = 2 * Math.PI * radius;


    const offset =
        circumference - (animatedPercentage / 100) * circumference;


    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedPercentage(percentage);
        }, index * 300);

        return () => clearTimeout(timer);

    }, [percentage, index]);


    return (
        <div className="flex flex-col items-center">

            <p className="mt-3 mb-1">
                {label}
            </p>

            <div className="relative w-28 h-28">

                <svg
                    className="w-full h-full -rotate-90"
                    viewBox="0 0 100 100"
                >

                    <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        stroke="#ffffff"
                        strokeWidth="12"
                        fill="none"
                    />


                    <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        stroke={color}
                        strokeWidth="12"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        className="transition-[stroke-dashoffset] duration-700 ease-out"
                    />

                </svg>


                <div className="absolute inset-0 font-semibold flex items-center justify-center">
                    {animatedPercentage.toFixed(0)}%
                </div>

            </div>

        </div>
    );
}