export function AppointmentCard({ appointment }) {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          Appointment with {appointment.workerType}
        </h3>
        <span className="px-3 py-1 text-sm font-medium text-white bg-yellow-500 rounded-full">
          {appointment.appointmentStatus}
        </span>
      </div>
      <div className="text-gray-700">
        <p className="mb-2">
          <strong>Message:</strong> {appointment.message}
        </p>
        <p className="mb-2">
          <strong>Appointment ID:</strong> {appointment.id}
        </p>
        <p className="mb-2">
          <strong>User ID:</strong> {appointment.userId}
        </p>
        <p className="mb-2">
          <strong>Worker ID:</strong> {appointment.workerId}
        </p>
        <p>
          <strong>Created At:</strong>
          {new Date(appointment.createdAt.seconds * 1000).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
