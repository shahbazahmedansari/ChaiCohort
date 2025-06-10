import { useEffect, useState } from "react";

export function ChaiMenu() {
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/all-chai")
      .then(res => res.json())
      .then(data => setMenu(data))
      .catch(err => console.log(setError(err.message)));
  }, []);

  return (
    <div>
      <h2>Available Chai</h2>
      <ul>
        {menu.map(chai => (
          <li key={chai.id}>
            {chai.name}
          </li>
        ))}
      </ul>
    </div>
  );
};