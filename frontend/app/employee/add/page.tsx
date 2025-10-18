"use client";
import EmployeeForm from "@/app/components/EmployeeForm";
import { useRouter } from "next/navigation";

export default function AddEmployeePage() {
  const router = useRouter();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold  bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Add New Employee</h1>
        <button
          onClick={() => router.back()}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          ← Back
        </button>
      </div>

      <EmployeeForm />
    </main>
  );
}
