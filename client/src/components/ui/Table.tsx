import React from 'react';

interface Column {
    header: string;
    accessor: string;
    cell?: (value: any) => React.ReactNode;
}

interface TableProps {
    data: any[];
    columns: Column[];
    emptyMessage?: string;
}

export const Table: React.FC<TableProps> = ({ data, columns, emptyMessage = 'No data available' }) => {
    if (data.length === 0) {
        return (
            <div className="text-center py-8 text-zinc-400">
                {emptyMessage}
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-lg border border-zinc-700">
            <table className="min-w-full divide-y divide-zinc-700">
                <thead className="bg-zinc-800">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.accessor}
                                className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-zinc-800/50 divide-y divide-zinc-700">
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-zinc-700/50 transition-colors">
                            {columns.map((column) => (
                                <td
                                    key={column.accessor}
                                    className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300"
                                >
                                    {column.cell
                                        ? column.cell(row[column.accessor])
                                        : row[column.accessor]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};