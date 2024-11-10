"use client";

import React from "react";

export interface BaseTableData {
  id: string;
  [key: string]: string | number | Date;
}

export interface Column<T extends BaseTableData> {
  header: string;
  accessorKey: keyof T;
  cell?: (value: T[keyof T]) => React.ReactNode;
}

interface DataTableProps<T extends BaseTableData> {
  columns: Column<T>[];
  data: T[];
}

function DataTable<T extends BaseTableData>({
  columns,
  data,
}: DataTableProps<T>) {
  return (
    <div className="relative w-full overflow-auto">
      <table className="w-full caption-bottom text-sm">
        <thead className="border-b [&_tr]:border-b">
          <tr className="border-b transition-colors hover:bg-gray-100">
            {columns.map((column, index) => (
              <th
                key={index}
                className="h-12 px-6 text-center align-middle font-medium text-gray-500"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b transition-colors hover:bg-gray-50"
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="p-6 text-center align-middle">
                  {column.cell
                    ? column.cell(row[column.accessorKey])
                    : String(row[column.accessorKey])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
