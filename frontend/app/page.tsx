import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";

export default function HomePage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Employee Directory</h1>
      <EmployeeList />
      <EmployeeForm />
    </div>
  );
}


// import Image from "next/image";

// export default function Home() {
//   return (
//     <h2 className="text-amber-600 text-9xl">Thank God</h2>
//   );
// }
