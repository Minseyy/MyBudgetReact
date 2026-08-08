import { useEffect, useState } from "react";

export default function DeleteModal({
    isOpen,
    onClose,
    onDelete,
    title = "Delete Record",
    record,
    details = [],
}) {
    const [shouldRender, setShouldRender] = useState(isOpen);
    const [isClosing, setIsClosing] = useState(false);

    // Handle opening
    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            setIsClosing(false);
        } else if (shouldRender) {
            // Start closing animation
            setIsClosing(true);

            // Remove from DOM after animation
            const timer = setTimeout(() => {
                setShouldRender(false);
                setIsClosing(false);
            }, 200);

            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!shouldRender) return null;

    const handleClose = () => {
        setIsClosing(true);

        setTimeout(() => {
            onClose();
        }, 200);
    };

    const handleDelete = () => {
        onDelete(record);
        handleClose();
    };

    return (
        <div
            className={`
                fixed inset-0 z-50
                flex items-center justify-center
                bg-black/40 backdrop-blur-sm
                transition-opacity duration-200
                ${isClosing ? "opacity-0" : "opacity-100"}
            `}
            onClick={handleClose}
        >
            <div
                className={`
                    w-full max-w-md mx-4
                    rounded-2xl bg-white
                    p-6 shadow-2xl
                    transition-all duration-200 ease-out
                    ${
                        isClosing
                            ? "scale-95 opacity-0"
                            : "scale-100 opacity-100"
                    }
                `}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="mb-5">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {title}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Are you sure you want to delete this record?
                    </p>
                </div>

                {/* Record details */}
                {record && (
                    <div className="mb-6 rounded-xl bg-gray-50 p-4">
                        <div className="space-y-3">
                            {details.map((detail) => (
                                <div
                                    key={detail.label}
                                    className="flex justify-between gap-4"
                                >
                                    <span className="text-sm font-medium text-gray-500">
                                        {detail.label}
                                    </span>

                                    <span className="text-sm font-semibold text-gray-800 text-right">
                                        {detail.render
                                            ? detail.render(
                                                  record[detail.key],
                                                  record
                                              )
                                            : record[detail.key]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="
                            flex-1 rounded-xl
                            border-2 border-gray-200
                            px-4 py-3
                            font-semibold text-gray-600
                            transition
                            hover:bg-gray-100
                        "
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleDelete}
                        className="
                            flex-1 rounded-xl
                            bg-red-500
                            px-4 py-3
                            font-semibold text-white
                            transition
                            hover:bg-red-600
                        "
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
