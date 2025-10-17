"use client";
import { use } from "react"; // ✅ New React helper
import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { User, DollarSign, Briefcase, Building2 } from "lucide-react";

const GET_EMPLOYEE_DETAILS = gql`
  query GetEmployeeDetails($id: ID!) {
    getEmployeeDetails(id: $id) {
      id
      name
      position
      department
      salary
    }
  }
`;

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  salary: number;
}

interface GetEmployeeData {
  getEmployeeDetails: Employee;
}

export default function EmployeeDetails({ params }: { params: Promise<{ id: string }> }) {
  // ✅ unwrap the promise
  const { id } = use(params);

  const { data, loading, error } = useQuery<GetEmployeeData>(GET_EMPLOYEE_DETAILS, {
    variables: { id },
  });

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">Error: {error.message}</p>;
  if (!data || !data.getEmployeeDetails)
    return <p className="text-center mt-10">No employee data found</p>;

  const emp = data.getEmployeeDetails;

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl shadow-lg p-8 animate-fade-in">
        <div className="flex items-start gap-6 mb-8 pb-8 border-b border-gray-200">
          <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-md">
            <User className="h-12 w-12 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{emp.name}</h1>
            <p className="text-lg text-gray-500 flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              {emp.position}
            </p>
          </div>
          <span className="bg-gray-100 text-gray-700 rounded-full px-4 py-2 text-base font-medium shadow-sm">
            {emp.department}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-500">
              <Building2 className="h-5 w-5" />
              <span className="text-sm font-medium">Department</span>
            </div>
            <p className="text-lg font-semibold text-gray-800 pl-7">{emp.department}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-500">
                 <DollarSign className="h-5 w-5" />
               <span className="text-sm font-medium">Salary</span>
            </div>
            <p className="text-lg font-semibold text-gray-800 pl-7">
              ${emp.salary.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => history.back()}
            className="bg-gray-800 text-white px-6 py-2 rounded-lg shadow hover:bg-gray-700 transition-all duration-200"
          >
            ← Back
          </button>
        </div>
      </div>
    </main>
  );
}




