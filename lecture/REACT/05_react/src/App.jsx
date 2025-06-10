import { useEffect, useState } from "react";
import { ChaiMenu } from "./AllChai";

export function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch(`http://localhost:3000/api`)
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => setMessage("Failed to load message"));
  }, []);

  return (
    <div>
      <h1>Welcome to chaicode</h1>
      <p>Serving hot chai with React</p>
      <h2>{message}</h2>
      <ChaiMenu />
    </div>
  );
}