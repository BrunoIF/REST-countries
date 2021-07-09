import { useState } from "react";

export function useLazyFetch(url, initialArgs) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const makeRequest = async (args) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(args ?? initialArgs),
      });
      const data = await response.json();
      setData(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    fetch: (args) => makeRequest(args),
    data,
  };
}
