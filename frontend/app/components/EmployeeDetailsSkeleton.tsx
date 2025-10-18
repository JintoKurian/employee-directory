// app/components/EmployeeDetailsSkeleton.tsx
"use client";

export default function EmployeeDetailsSkeleton() {
  return (
    <main className="container mx-auto px-4 py-6 md:py-10 max-w-3xl">
      <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl shadow-lg p-6 md:p-8 animate-pulse">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:gap-6 mb-8 pb-6 border-b border-gray-200 text-center sm:text-left">
          
          {/* Avatar */}
          <div className="h-20 w-20 sm:h-24 sm:w-24 mx-auto sm:mx-0 rounded-2xl bg-gray-200 flex items-center justify-center flex-shrink-0 shadow-md mb-4 sm:mb-0"></div>

          {/* Name & Position */}
          <div className="flex-1 space-y-2">
            <div className="h-6 w-48 bg-gray-200 rounded mx-auto sm:mx-0"></div>
            <div className="h-4 w-32 bg-gray-200 rounded mx-auto sm:mx-0"></div>
          </div>

          {/* Department Badge */}
          <div className="h-6 w-28 bg-gray-200 rounded-full mt-3 sm:mt-0 mx-auto sm:mx-0"></div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-200 rounded mx-auto sm:mx-0"></div>
            <div className="h-6 w-32 bg-gray-200 rounded mx-auto sm:mx-0"></div>
          </div>

          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-200 rounded mx-auto sm:mx-0"></div>
            <div className="h-6 w-32 bg-gray-200 rounded mx-auto sm:mx-0"></div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-10 flex justify-center">
          <div className="h-10 w-32 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </main>
  );
}
