import { useUser } from "../../providers/UserProvider";

export default function DashboardPage() {
  const user = useUser();
  return (
    <div>
      <h1 className="mb-10 font-bold">Dashboard</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
