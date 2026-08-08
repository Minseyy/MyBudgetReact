export default function CustomLegend({ labels, colors, values }) {
    return (
        <div className="flex flex-col gap-3">
            {labels.map((label, index) => (
                <div 
                    key={label}
                    className="flex items-center justify-between gap-4"
                >
                    <div className="flex items-center gap-2">
                        <span
                            className="w-4 h-4 rounded-full"
                            style={{
                                backgroundColor: colors[index]
                            }}
                        />

                        <span>
                            {label}
                        </span>
                    </div>

                    <span>
                        ${values[index].toFixed(2)}
                    </span>
                </div>
            ))}
        </div>
    );
}