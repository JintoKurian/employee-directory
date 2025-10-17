"use client"
import { useRouter } from "next/navigation";
import { IoIosAdd } from "react-icons/io";


function AddEmployeeButton() {
    const router = useRouter();

  return (
    <button
     onClick={() => router.push("/employee/add")}
      style={{ background: "var(--gradient-primary)" }}
      className="text-white flex font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:opacity-90 transition focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
    >
        <IoIosAdd className="h-6 w-6" />
      Add new Employee
    </button>
  )
}

export default AddEmployeeButton
