"use client";
import { useRouter } from "next/navigation";
import { IoIosAdd } from "react-icons/io";

function AddEmployeeButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/employee/add")}
      style={{ background: "var(--gradient-primary)" }}
      className="text-white flex items-center justify-center gap-2 font-medium rounded-lg text-sm sm:text-base px-4 sm:px-5 py-2 sm:py-2.5 text-center hover:opacity-90 transition focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 w-full sm:w-auto"
    >
      <IoIosAdd className="h-5 w-5 sm:h-6 sm:w-6" />
      <span className="truncate">Add New Employee</span>
    </button>
  );
}

export default AddEmployeeButton;
