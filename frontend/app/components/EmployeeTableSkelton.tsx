"use client";

export default function EmployeeTableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Name</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Position</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Department</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Salary</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 animate-pulse">
          {Array.from({ length: rows }).map((_, idx) => (
            <tr key={idx}>
              <td className="px-4 py-3">
                <div className="h-4 w-full max-w-[200px] bg-gray-200 rounded"></div>
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-full max-w-[180px] bg-gray-200 rounded"></div>
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-full max-w-[220px] bg-gray-200 rounded"></div>
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-full max-w-[120px] bg-gray-200 rounded"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

