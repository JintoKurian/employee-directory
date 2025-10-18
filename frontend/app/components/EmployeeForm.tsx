"use client";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";

const ADD_EMPLOYEE = gql`
  mutation AddEmployee(
    $name: String!
    $position: String!
    $department: String!
    $salary: Float!
  ) {
    addEmployee(
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

export default function EmployeeForm() {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    department: "",
    salary: "",
  });

  const [addEmployee, { loading, error }] = useMutation(ADD_EMPLOYEE, {
    // Optionally refetch the employee list after adding one
    refetchQueries: ["GetAllEmployees"],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.position || !formData.department || !formData.salary) {
      alert("All fields are required");
      return;
    }

    try {
      await addEmployee({
        variables: {
          name: formData.name,
          position: formData.position,
          department: formData.department,
          salary: parseFloat(formData.salary),
        },
      });
      alert("Employee added successfully!");
      setFormData({ name: "", position: "", department: "", salary: "" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-xl border border-gray-200 rounded-lg p-6 mt-6"
    >
      <h2 className="text-xl font-semibold mb-4 text-center  bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Add New Employee</h2>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Position</label>
        <input
          type="text"
          name="position"
          value={formData.position}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Department</label>
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="">Select department</option>
          <option value="Engineering">Engineering</option>
          <option value="Design">Design</option>
          <option value="Management">Management</option>
          <option value="Human Resources">Human Resources</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Salary</label>
        <input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      {error && (
        <p className="text-red-600 text-sm mb-2">
          Error adding employee: {error.message}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Adding..." : "Add Employee"}
      </button>
    </form>
  );
}
