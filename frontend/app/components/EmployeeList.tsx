"use client";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useState } from "react";
import DropdownMenu from "./DropdownMenu";
import SearchInput from "./SearchInput";
import { useRouter } from "next/navigation";
import EmployeeTableSkeleton from "./EmployeeTableSkelton";

const GET_ALL_EMPLOYEES = gql`
  query GetAllEmployees {
    getAllEmployees {
      id
      name
      position
      department
    }
  }
`;

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
}

interface GetAllEmployeesData {
  getAllEmployees: Employee[];
}


export default function EmployeeList() {
  const router = useRouter();
  const { data, loading, error } = useQuery<GetAllEmployeesData>(GET_ALL_EMPLOYEES);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All");

  if (loading) return <EmployeeTableSkeleton/>;
  if (error) return <p>Error fetching employees: {error.message}</p>;

  const departments = ["All", ...new Set(data?.getAllEmployees?.map(emp => emp.department) || [])];


  // filtering employees based on the selected department

  const filteredEmployees = selectedDepartment === "All" ?
    data?.getAllEmployees
    :
    data?.getAllEmployees?.filter(emp => emp.department === selectedDepartment)


  return (
    <>
      <div className="flex gap-3 items-center">
        <div className="flex-grow">
          <SearchInput />
        </div>
        <div className="flex-shrink-0">
          <DropdownMenu departments={departments} selectedDepartment={selectedDepartment} onSelectDepartment={setSelectedDepartment} />
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-400">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr className=" border-b border-gray-400">
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Position
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees?.map((emp: any) => (
              <tr
                key={emp.id}
                className="odd:bg-white even:bg-gray-50 border-b border-gray-400"

              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap cursor-pointer"
                  onClick={() => router.push(`/employee/${emp.id}`)}
                >
                  {emp.name}
                </th>
                <td className="px-6 py-4">{emp.position}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => router.push(`/employee/edit/${emp.id}`)}
                    className="font-medium text-blue-600 hover:underline cursor-pointer"
                  >
                    Edit
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>

  );
}
