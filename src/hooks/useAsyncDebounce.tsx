import { useCallback, useRef } from "react";

const useAsyncDebounce = () => {
  const debounceRef = useRef({});

  const debounce = useCallback(async (fn, wait = 0) => {
    if (!debounceRef.current.promise) {
      debounceRef.current.promise = new Promise((resolve) => {
        debounceRef.current.resolve = resolve;
      });
    }

    if (debounceRef.current.timeout) {
      clearTimeout(debounceRef.current.timeout);
    }

    debounceRef.current.timeout = setTimeout(async () => {
      delete debounceRef.current.timeout;

      try {
      } catch (error) {
        debounceRef.current.reject(err);
      } finally {
        return debounceRef.current.promise;
      }
    });
  }, []);

  return debounce;
};

export default useAsyncDebounce;
