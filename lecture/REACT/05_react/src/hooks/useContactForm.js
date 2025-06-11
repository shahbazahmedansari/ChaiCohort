import { useState } from "react";

export function useContactForm() {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const submitContact = async (formData) => {
    // fresh start -> remove old stored data in variables
    setLoading(true);
    setSuccessMessage(null);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setSuccessMessage(data.success || "Message sent");
    } catch (error) {
      setError(error.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return { loading, successMessage, error, submitContact };
}