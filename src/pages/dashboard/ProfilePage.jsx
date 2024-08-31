import { useEffect, useState } from "react";
import { useUser } from "../../providers/UserProvider";
import { getUserData, getUser } from "../../utils/user";
import { useSearchParams } from "react-router-dom";

export default function ProfilePage() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id");

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  const fetchUserData = async (user) => {
    try {
      const data = await getUserData(user.id, user.data.role);
      setUserData(data);
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const fetchUser = async (uid) => {
    try {
      const user = await getUser(uid);
      setUser(user);
      console.log(user);
      if (user) {
        await fetchUserData(user); // Pass the user object to fetchUserData
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    } finally {
      setLoading(false); // Set loading to false after user data is fetched
    }
  };

  useEffect(() => {
    fetchUser(userId);
  }, []);
  if (loading) return <>Loading User...</>;
  if (!user || !userData) return <>User not Found</>;
  switch (user.data.role) {
    case "STUDENT":
      return <StudentProfile userData={userData} user={user} />;
    case "EMPLOYEE":
      return <EmployeeProfile userData={userData} user={user} />;
    case "WORKER":
      return <WorkerProfile userData={userData} user={user} />;
    default:
      return null;
  }
}

function StudentProfile({ userData, user }) {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          {/* Avatar */}
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-4xl font-bold">
            {userData.firstname[0]}
            {userData.lastname[0]}
          </div>
          <div className="ml-6">
            <h1 className="text-3xl font-bold">
              {userData.firstname} {userData.middlename || ""}{" "}
              {userData.lastname}
            </h1>
            <p className="text-lg text-gray-600">{userData.program}</p>
            <p className="text-md text-gray-500">{userData.department}</p>
          </div>
        </div>

        {/* Account Details */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Account Details</h2>
          <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
            <p>
              <span className="font-semibold">User ID:</span> {user.id}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user.data.email}
            </p>
            <p>
              <span className="font-semibold">Onboarded:</span>{" "}
              {user.data.onboarded ? "Yes" : "No"}
            </p>
            <p>
              <span className="font-semibold">Role:</span> {user.data.role}
            </p>
            <p>
              <span className="font-semibold">Created At:</span>{" "}
              {new Date(user.data.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Academic Details */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Academic Details</h2>
          <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
            <p>
              <span className="font-semibold">Student ID:</span>{" "}
              {userData.studentId}
            </p>
            <p>
              <span className="font-semibold">Program:</span> {userData.program}
            </p>
            <p>
              <span className="font-semibold">Year Level:</span>{" "}
              {userData.yearLevel}
            </p>
            <p>
              <span className="font-semibold">Department:</span>{" "}
              {userData.department}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
function EmployeeProfile({ userData, user }) {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          {/* Avatar */}
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-4xl font-bold">
            {userData.firstname[0]}
            {userData.lastname[0]}
          </div>
          <div className="ml-6">
            <h1 className="text-3xl font-bold">
              {userData.firstname} {userData.middlename || ""}{" "}
              {userData.lastname}
            </h1>
            <p className="text-lg text-gray-600">{userData.employeeType}</p>
            <p className="text-md text-gray-500">{userData.assignment}</p>
          </div>
        </div>

        {/* Account Details */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Account Details</h2>
          <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
            <p>
              <span className="font-semibold">Employee ID:</span>{" "}
              {userData.employeeId}
            </p>
            <p>
              <span className="font-semibold">User ID:</span> {user.id}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user.data.email}
            </p>
            <p>
              <span className="font-semibold">Onboarded:</span>{" "}
              {user.data.onboarded ? "Yes" : "No"}
            </p>
            <p>
              <span className="font-semibold">Role:</span> {user.data.role}
            </p>
            <p>
              <span className="font-semibold">Created At:</span>{" "}
              {new Date(user.data.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Additional Information */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Additional Information</h2>
          <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
            <p>
              <span className="font-semibold">Assignment:</span>{" "}
              {userData.assignment}
            </p>
            <p>
              <span className="font-semibold">Employee Type:</span>{" "}
              {userData.employeeType}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
function WorkerProfile({ userData, user }) {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          {/* Avatar */}
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-4xl font-bold">
            {userData.firstname[0]}
            {userData.lastname[0]}
          </div>
          <div className="ml-6">
            <h1 className="text-3xl font-bold">
              {userData.firstname} {userData.middlename || ""}{" "}
              {userData.lastname}
            </h1>
            <p className="text-lg text-gray-600">{userData.workerType}</p>
          </div>
        </div>

        {/* Account Details */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Account Details</h2>
          <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
            <p>
              <span className="font-semibold">User ID:</span> {user.id}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user.data.email}
            </p>
            <p>
              <span className="font-semibold">Onboarded:</span>{" "}
              {user.data.onboarded ? "Yes" : "No"}
            </p>
            <p>
              <span className="font-semibold">Role:</span> {user.data.role}
            </p>
            <p>
              <span className="font-semibold">Created At:</span>{" "}
              {new Date(user.data.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Additional Information */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Additional Information</h2>
          <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
            <p>
              <span className="font-semibold">Worker ID:</span>{" "}
              {userData.workerId}
            </p>
            <p>
              <span className="font-semibold">Worker Type:</span>{" "}
              {userData.workerType}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
