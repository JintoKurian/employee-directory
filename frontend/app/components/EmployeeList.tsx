"use client";
import { gql} from "@apollo/client";
 import { useQuery } from "@apollo/client/react";
import { useState } from "react";

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
const { data, loading, error } = useQuery<GetAllEmployeesData>(GET_ALL_EMPLOYEES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching employees: {error.message}</p>;

  return (
    <div>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Position</th>
            <th className="border p-2">Department</th>
          </tr>
        </thead>
        <tbody>
          {data?.getAllEmployees?.map((emp: any) => (
            <tr key={emp.id}>
              <td className="border p-2">{emp.name}</td>
              <td className="border p-2">{emp.position}</td>
              <td className="border p-2">{emp.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
