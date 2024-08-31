import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useUser } from "../../providers/UserProvider";
import { NotificationCard } from "../../components/NotificationCard";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "notifications"),
      where("toId", "==", user.id)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const notificationsArray = [];
      querySnapshot.forEach((doc) => {
        notificationsArray.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setNotifications(notificationsArray);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [user.id]);

  return (
    <main className="p-6 sm:p-8 lg:p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Notifications
      </h1>
      <section className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationCard
              notification={notification}
              key={notification.id}
            />
          ))
        ) : (
          <div className="text-gray-500">You have no notifications.</div>
        )}
      </section>
    </main>
  );
}
