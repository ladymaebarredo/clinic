import React, { useEffect, useState } from "react";
import { getUsersData } from "../../utils/user";
import {
  EmployeesTable,
  StudentsTable,
  WorkersTable,
} from "../../components/UsersTable";

export default function UsersPage() {
  const [students, setStudents] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [workers, setWorkers] = useState([]);

  const [loadingStudents, setLoadingStudents] = useState(true);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [loadingWorkers, setLoadingWorkers] = useState(true);

  // Function to fetch students
  const fetchStudents = async () => {
    try {
      const data = await getUsersData("students");
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students data:", error);
    } finally {
      setLoadingStudents(false);
    }
  };

  // Function to fetch employees
  const fetchEmployees = async () => {
    try {
      const data = await getUsersData("employees");
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees data:", error);
    } finally {
      setLoadingEmployees(false);
    }
  };

  // Function to fetch workers
  const fetchWorkers = async () => {
    try {
      const data = await getUsersData("workers");
      setWorkers(data);
    } catch (error) {
      console.error("Error fetching workers data:", error);
    } finally {
      setLoadingWorkers(false);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchEmployees();
    fetchWorkers();
  }, []);

  return (
    <div className="p-4 space-y-8">
      <section>
        <h1 className="font-semibold mb-4">Students</h1>
        <StudentsTable students={students} />
      </section>
      <section>
        <h1 className="font-semibold mb-4">Employees</h1>
        <EmployeesTable employees={employees} />
      </section>
      <section>
        <h1 className="font-semibold mb-4">Workers</h1>
        <WorkersTable workers={workers} />
      </section>
    </div>
  );
}
