import EmployeeList from "./components/EmployeeList";

export default function HomePage() {
  return (
    <div className="p-4">
      <h1 className="text-lg md:text-2xl font-bold mb-4  bg-gradient-primary bg-clip-text text-transparent">Employee Details</h1>
      <EmployeeList />
    </div>
  );
}