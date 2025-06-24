import { useState } from "react";

export interface RequestArgs {
  page: number;
  amount: number;
  filters?: { name?: string; region?: string };
}

interface LazyFetchReturn<T> {
  data: null | T;
  loading: boolean;
  error: string;
  fetch: (args: RequestArgs) => Promise<void>;
}

export function useLazyFetch<T>(
  url: string,
  initialArgs: RequestArgs
): LazyFetchReturn<T> {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const makeRequest = async (args: RequestArgs) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(args ?? initialArgs),
      });
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }
      setData(data.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    fetch: (args: RequestArgs) => makeRequest(args),
    data,
  };
}
