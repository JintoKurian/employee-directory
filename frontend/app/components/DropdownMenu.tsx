"use client";
import { useState } from "react";

interface DropdownMenuProps {
    departments: string[];
    selectedDepartment: string;
    onSelectDepartment: (department: string) => void;
}

interface EmployeeData {
  id: string;
  name: string;
  position: string;
  department: string;
}

export default function DropdownMenu({ 
  departments, 
  selectedDepartment, 
  onSelectDepartment 
}: DropdownMenuProps) {

  const [open, setOpen] = useState(false);

  const handleSelect = (department: string)=>{
    onSelectDepartment(department);
    setOpen(false);
  }

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs md:text-sm px-2 md:px-5 py-2.5 text-center inline-flex items-center"
      >
        Filter Departments
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44">
          <ul className="py-2 text-sm text-gray-700">
           {departments.map((dept)=> (
            <li key={dept}>
                <button onClick={()=> handleSelect(dept)}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                    selectedDepartment === dept ? 'bg-gray-100 font-semibold' : ''
                }`}
                >
                    {dept}
                </button>
            </li>
           ))}
          </ul>
        </div>
      )}
    </div>
  );
}
