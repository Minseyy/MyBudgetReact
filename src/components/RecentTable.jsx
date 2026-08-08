export default function RecentTable({ title, columns, data }) {
    return (
        <div className="dashboard box">
            <h2>{title}</h2>
            <div className="rounded-md overflow-hidden">
                <table className="w-full border-collapse ">
                    <thead className="bg-[var(--table-header)] text-white ">
                        <tr>
                            {columns.map((column) => (
                                <th key={column.key} className="px-4 py-2">
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((row, index) => (
                            <tr
                                key={index}
                                className="bg-[var(--table-row)] border border-gray-200 divide-x"
                            >
                                {columns.map((column) => (
                                    <td
                                        key={column.key}
                                        className="px-4 py-2"
                                    >
                                        {column.render
                                            ? column.render(row[column.key], row)
                                            : row[column.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}