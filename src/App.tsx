import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}


function App() {

const [users, setUsers] = useState<User[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const controller = new AbortController();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

     const response = await fetch(
      "https://jsonplaceholder.typicode.com/users",
       {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: User[] = await response.json();
      if (!controller.signal.aborted){
        setUsers(data);
      } 
      

    } catch (error) {
      if (controller.signal.aborted) return;

      setError(
        error instanceof Error ? error.message :
        "Failed to fetch users");
    } finally { 
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  };

  fetchUsers();

  return () => controller.abort();
}, []);

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Users</h2>
       {users.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
        </div>
      ))}
    </div>
  );
}

export default App;