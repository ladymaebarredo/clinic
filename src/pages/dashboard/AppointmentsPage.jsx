import { useEffect, useState } from "react";
import { CreateAppointmentModal } from "../../components/CreateAppointmentModal";
import { useUser } from "../../providers/UserProvider";
import { getWorkerAppointments } from "../../utils/appointment";
import { AppointmentCard } from "../../components/AppointmentCard";
import { AppointmentsTable } from "../../components/AppointmentsTable";

export default function AppointmentsPage() {
  const { user } = useUser();
  if (user.data.role === "WORKER") {
    return <Worker user={user} />;
  } else {
    return <Appointee user={user} />;
  }
}

function Appointee({ user }) {
  const [dentistApp, setDentistApp] = useState(false);
  const [physicianApp, setPhysicianApp] = useState(false);
  const [nurseApp, setNurseApp] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const toggleDentistApp = () => setDentistApp(!dentistApp);
  const togglePhysicianApp = () => setPhysicianApp(!physicianApp);
  const toggleNurseApp = () => setNurseApp(!nurseApp);

  const fetchAppointments = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await getWorkerAppointments(user.id, "userId");
      setAppointments(response);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const activeAppointment = appointments.find(
    (appointment) => appointment.appointmentStatus === "Pending"
  );

  return (
    <main>
      <h1 className="font-semibold">Appointments</h1>
      <section className="flex items-center gap-3 my-10">
        <button
          className="bg-red-950 text-white p-2 rounded-lg"
          onClick={toggleDentistApp}
        >
          Create Dentist Appointment
        </button>
        <button
          className="bg-red-950 text-white p-2 rounded-lg"
          onClick={togglePhysicianApp}
        >
          Create Physician Appointment
        </button>
        <button
          className="bg-red-950 text-white p-2 rounded-lg"
          onClick={toggleNurseApp}
        >
          Create Nurse Appointment
        </button>
      </section>
      {dentistApp && (
        <CreateAppointmentModal
          workerType="Dentist"
          onClose={toggleDentistApp}
          revalidate={fetchAppointments}
        />
      )}
      {physicianApp && (
        <CreateAppointmentModal
          workerType="Physician"
          onClose={togglePhysicianApp}
          revalidate={fetchAppointments}
        />
      )}
      {nurseApp && (
        <CreateAppointmentModal
          workerType="Nurse"
          onClose={toggleNurseApp}
          revalidate={fetchAppointments}
        />
      )}
      <section className="flex gap-4 flex-col">
        <div className="w-[30rem]">
          <h1>Active Appointment</h1>
          {loading ? (
            <p>Loading...</p> // Loading indicator
          ) : activeAppointment ? (
            <AppointmentCard appointment={activeAppointment} />
          ) : (
            <>You have no active appointment.</>
          )}
        </div>
        <div className="flex-1">
          <h1>My Appointments</h1>
          {loading ? (
            <p>Loading...</p> // Loading indicator
          ) : (
            <AppointmentsTable appointments={appointments} />
          )}
        </div>
      </section>
    </main>
  );
}

function Worker({ user }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await getWorkerAppointments(user.id, "workerId");
        setAppointments(response);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchAppointments();
  }, [user.id]);

  return (
    <main>
      <h1 className="font-semibold mb-10">My Appointments</h1>
      {loading ? (
        <p>Loading...</p> // Loading indicator
      ) : (
        <AppointmentsTable appointments={appointments} />
      )}
    </main>
  );
}
