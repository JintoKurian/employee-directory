"use client";
import { use } from "react";
import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Briefcase, Building2, DollarSign } from "lucide-react";

// GraphQL query to fetch employee by ID
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

// GraphQL mutation to update employee
const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $id: ID!
    $name: String!
    $position: String!
    $department: String!
    $salary: Float!
  ) {
    updateEmployee(
      id: $id
      name: $name
      position: $position
      department: $department
      salary: $salary
    ) {
      id
      name
      position
      department
      salary
    }
  }
`;

export default function EditEmployeePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

    interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  salary: string;
}

  interface GetEmployeeData {
    getEmployeeDetails: Employee;
  }

  const { data, loading, error } = useQuery<GetEmployeeData>(GET_EMPLOYEE_DETAILS, {
    variables: { id },
  });

  const [updateEmployee, { loading: updating }] = useMutation(UPDATE_EMPLOYEE);

  const [formData, setFormData] = useState({
    name: "",
    position: "",
    department: "",
    salary: "",
  });


  

  // Prefill form data
  useEffect(() => {
    if (data?.getEmployeeDetails) {
      const { name, position, department, salary } = data.getEmployeeDetails;
      setFormData({ name, position, department, salary });
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateEmployee({
        variables: {
          id,
          ...formData,
          salary: parseFloat(formData.salary),
        },
      });
      alert("Employee updated successfully!");
      router.push(`/employee/${id}`);
    } catch (err) {
      console.error(err);
      alert("Error updating employee");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 mt-10">
        Error: {error.message}
      </p>
    );

  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl shadow-lg p-6 sm:p-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
            <User className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Edit Employee
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="flex items-center gap-2 text-gray-600 text-sm font-medium mb-1">
              <User className="h-4 w-4 text-gray-500" />
              Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-gray-600 text-sm font-medium mb-1">
              <Briefcase className="h-4 w-4 text-gray-500" />
              Position
            </label>
            <input
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-gray-600 text-sm font-medium mb-1">
              <Building2 className="h-4 w-4 text-gray-500" />
              Department
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            >
              <option value="">Select department</option>
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Management">Management</option>
              <option value="Human Resource">Human Resource</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-gray-600 text-sm font-medium mb-1">
              <DollarSign className="h-4 w-4 text-gray-500" />
              Salary
            </label>
            <input
              name="salary"
              type="number"
              value={formData.salary}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={updating}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
          >
            {updating ? "Updating..." : "Update Employee"}
          </button>
        </form>

        {/* Back Button */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => history.back()}
            className="text-gray-600 hover:text-gray-800 text-sm font-medium underline"
          >
            ← Back
          </button>
        </div>
      </div>
    </main>
  );
}
