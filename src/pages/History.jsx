import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function HistoryPage({
    records = [],
    title,
    total = 0,
    totalLabel,
    searchPlaceholder = "Search...",
    searchField,
    backRoute,
    columns = [],
    onEdit,
    onDelete,
}) {
    const [search, setSearch] = useState("");
    const [monthFilter, setMonthFilter] = useState("");
    const [sortBy, setSortBy] = useState("");

    const navigate = useNavigate();

    const filteredRecords = useMemo(() => {
        let result = [...records];

        if (search.trim()) {
            result = result.filter((record) =>
                String(record[searchField] ?? "")
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );
        }

        if (monthFilter) {
            result = result.filter((record) =>
                record.date?.startsWith(monthFilter)
            );
        }

        if (sortBy === "amount-high") {
            result.sort((a, b) => Number(b.amount) - Number(a.amount));
        }

        if (sortBy === "amount-low") {
            result.sort((a, b) => Number(a.amount) - Number(b.amount));
        }

        if (sortBy === "date-new") {
            result.sort((a, b) => new Date(b.date) - new Date(a.date));
        }

        if (sortBy === "date-old") {
            result.sort((a, b) => new Date(a.date) - new Date(b.date));
        }

        return result;
    }, [records, search, monthFilter, sortBy, searchField]);

    const clearFilters = () => {
        setSearch("");
        setMonthFilter("");
        setSortBy("");
    };

    return (
        <>
            {/* Back */}
            <button
                className="px-4 py-2 rounded-lg bg-[var(--button-active)] text-white hover:opacity-90"
                onClick={() => navigate(backRoute)}
            >
                ↩ Back
            </button>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                <h1 className="text-4xl font-bold">
                    {title}
                </h1>

                <div className="rounded-2xl bg-white/70 px-6 py-4 shadow-[var(--shadow)]">
                    <p className="text-sm font-semibold text-gray-500">
                        {totalLabel}
                    </p>

                    <p className="text-2xl font-bold text-pink-900">
                        ${Number(total).toFixed(2)}
                    </p>
                </div>
            </div>

            {/* Controls */}
            <div className="rounded-2xl bg-white/70 p-5 shadow-[var(--shadow)] mb-6">
                <div className="flex flex-wrap gap-4">

                    {/* Search */}
                    <div className="flex flex-1 min-w-[220px] flex-col gap-1">
                        <label
                            htmlFor="history-search"
                            className="text-sm font-semibold text-gray-500"
                        >
                            Search
                        </label>

                        <input
                            id="history-search"
                            type="text"
                            placeholder={searchPlaceholder}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-700 outline-none transition focus:border-purple-400"
                        />
                    </div>

                    {/* Month */}
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="month-filter"
                            className="text-sm font-semibold text-gray-500"
                        >
                            Filter by month
                        </label>

                        <input
                            id="month-filter"
                            type="month"
                            value={monthFilter}
                            onChange={(e) => setMonthFilter(e.target.value)}
                            className="rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-700 outline-none focus:border-purple-400"
                        />
                    </div>

                    {/* Sort */}
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="history-sort"
                            className="text-sm font-semibold text-gray-500"
                        >
                            Sort by
                        </label>

                        <select
                            id="history-sort"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-700 outline-none focus:border-purple-400"
                        >
                            <option value="">Select sorting</option>
                            <option value="amount-high">
                                Amount: High → Low
                            </option>
                            <option value="amount-low">
                                Amount: Low → High
                            </option>
                            <option value="date-new">
                                Date: Newest
                            </option>
                            <option value="date-old">
                                Date: Oldest
                            </option>
                        </select>
                    </div>

                    {/* Clear */}
                    {(search || monthFilter || sortBy) && (
                        <button
                            onClick={clearFilters}
                            className="rounded-xl px-5 py-3 font-semibold text-gray-600 hover:bg-gray-100"
                        >
                            Clear
                        </button>
                    )}
                </div>
            </div>

            {/* Results count */}
            <div className="flex justify-between items-center mb-3 px-1">
                <p className="text-sm text-gray-500">
                    Showing {filteredRecords.length}{" "}
                    {filteredRecords.length === 1 ? "record" : "records"}
                </p>
            </div>

            {/* Table */}
            <div className="rounded-2xl bg-white/70 shadow-[var(--shadow)] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">

                        <thead className="bg-[var(--table-header)]">
                            <tr>
                                {columns.map((column) => (
                                    <th
                                        key={column.key}
                                        className="px-6 py-4 text-sm font-semibold text-white text-left"
                                    >
                                        {column.header}
                                    </th>
                                ))}

                                <th className="px-6 py-4 text-sm font-semibold text-white text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredRecords.length > 0 ? (
                                filteredRecords.map((record, index) => (
                                    <tr
                                        key={record.id ?? index}
                                        className="border-b border-gray-100 last:border-0 hover:bg-white/60 transition"
                                    >
                                        {columns.map((column) => (
                                            <td
                                                key={column.key}
                                                className="px-6 py-4 text-gray-700"
                                            >
                                                {column.render
                                                    ? column.render(
                                                        record[column.key],
                                                        record
                                                    )
                                                    : record[column.key]}
                                            </td>
                                        ))}

                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">

                                                <button
                                                    onClick={() => onEdit?.(record)}
                                                    className="rounded-lg px-3 py-2 text-sm font-semibold text-purple-600 hover:bg-purple-50"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() => onDelete?.(record)}
                                                    className="rounded-lg px-3 py-2 text-sm font-semibold text-red-500 hover:bg-red-50"
                                                >
                                                    Delete
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={columns.length + 1}
                                        className="px-6 py-12 text-center"
                                    >
                                        <p className="font-semibold text-gray-600">
                                            No records found
                                        </p>

                                        <p className="text-sm text-gray-400 mt-1">
                                            Try changing your search or filters.
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
            </div>
        </>
    );
}