export function AppointmentsTable({ appointments }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Worker Type</th>
            <th className="p-2 border">User ID</th>
            <th className="p-2 border">Created At</th>
            <th className="p-2 border">Worker ID</th>
            <th className="p-2 border">Message</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id} className="odd:bg-white even:bg-gray-50">
              <td className="p-2 border">{appointment.id}</td>
              <td className="p-2 border">{appointment.workerType}</td>
              <td className="p-2 border">{appointment.userId}</td>
              <td className="p-2 border">
                {new Date(
                  appointment.createdAt.seconds * 1000
                ).toLocaleString()}
              </td>
              <td className="p-2 border">{appointment.workerId}</td>
              <td className="p-2 border">{appointment.message}</td>
              <td className="p-2 border">{appointment.appointmentStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
