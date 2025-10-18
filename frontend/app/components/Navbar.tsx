import React from "react";
import AddEmployeeButton from "./AddEmployeeButton";
import { FaUsers } from "react-icons/fa";

function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white/70 backdrop-blur-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 sm:py-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md flex-shrink-0">
              <FaUsers className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Employee Directory
            </h1>
          </div>

          <div className="w-full sm:w-auto flex justify-start sm:justify-end">
            <AddEmployeeButton />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
