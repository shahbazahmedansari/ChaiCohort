import { useEffect, useState } from "react";
import { ChaiMenu } from "./AllChai";
import { useSpecialChai } from "./hooks/useSpecialChai";

export function App() {
  const [message, setMessage] = useState("Loading...");

  const { chai, loading, error } = useSpecialChai();

  useEffect(() => {
    fetch(`http://localhost:3000/api`)
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => setMessage("Failed to load message", error));
  }, []);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error...</h2>;

  return (
    <div>
      <h1>Welcome to chaicode</h1>
      <p>Serving hot chai with React</p>
      <h2>{message}</h2>
      <ChaiMenu />
      <h3>{chai.name}</h3>
    </div>
  );
}