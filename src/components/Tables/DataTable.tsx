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

export function DataTable<T extends BaseTableData>({
  columns,
  data,
}: DataTableProps<T>) {
  return (
    <div className="relative w-full overflow-auto">
      <table className="w-full caption-bottom text-sm">
        <thead className="border-b border-royalPurple/10">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="h-12 px-6 text-center align-middle font-medium text-skyBlue bg-royalPurple/5 transition-colors duration-200"
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
              className="border-b border-royalPurple/10 transition-colors hover:bg-royalPurple/5 animate-fade-up"
              style={{
                animationDelay: `${rowIndex * 50}ms`,
              }}
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="p-6 text-center align-middle text-white"
                >
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

export const buttonStyles = {
  primary:
    "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royalPurple focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-royalPurple text-white hover:bg-royalPurple/90 h-10 px-4 py-2 gap-2",
  secondary:
    "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oceanBlue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-oceanBlue text-white hover:bg-oceanBlue/90 h-10 px-4 py-2 gap-2",
  danger:
    "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-500 text-white hover:bg-red-600 h-10 px-4 py-2 gap-2",
};
