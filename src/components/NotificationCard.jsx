export function NotificationCard({ notification }) {
  return (
    <div className="w-full md:w-[30rem] border-2 p-10 rounded-xl flex gap-4 items-center drop-shadow-lg">
      <div
        className={`rounded-full w-3 h-3 ${
          notification.viewed ? "bg-gray-600" : "bg-blue-600"
        }`}
      ></div>
      <div>
        <h1>{notification.message}</h1>
        <p className="text-sm text-gray-500">
          {new Date(notification.notifiedAt.seconds * 1000).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
