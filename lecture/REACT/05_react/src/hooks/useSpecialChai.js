import { useEffect, useState } from "react";

export function useSpecialChai() {
  const [chai, setChai] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/special-chai")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch special chai");
        return res.json();
      })
      .then((data) => {
        setChai(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong");
        setLoading(false);
      })
      .finally(() => {
        setLoading(true);
      });
  }, []);

  return { chai, loading, error };
}