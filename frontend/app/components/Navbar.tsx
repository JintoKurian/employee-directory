import React from 'react'
import AddEmployeeButton from './AddEmployeeButton'
import { FaUsers } from "react-icons/fa";


function Navbar() {
  return (
       <header className="border-b border-gray-300 border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center">
                <FaUsers className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Employee Directory
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  20 employees across all departments
                </p>
              </div>
            </div>
            <AddEmployeeButton />
          </div>
        </div>
      </header>
  )
}

export default Navbar





