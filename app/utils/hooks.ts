import { useState, useEffect, useCallback } from "react";

import type { Transition } from "@remix-run/react/dist/transition";

export const useLocalStorage = <T>(
  key: string
): [T | undefined, typeof setLocalStorage] => {
  const [state, setState] = useState();

  const isClientSide = typeof window !== "undefined";

  useEffect(() => {
    const value = window.localStorage.getItem(key);

    if (isClientSide && value) {
      setState(typeof value === "string" ? JSON.parse(value) : value);
    }
  }, [isClientSide, key]);

  const setLocalStorage = useCallback(
    (data: any) => {
      const value = typeof data !== "string" ? JSON.stringify(data) : data;

      if (isClientSide) {
        window.localStorage.setItem(key, value);

        setState({ ...data });
      }
    },
    [isClientSide, key]
  );

  return [state, setLocalStorage];
};

export const useAlert = (transition: Transition, time: number = 1000) => {
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    if (transition.state === "loading" && transition.type === "actionReload") {
      setAlert(true);

      setTimeout(() => {
        setAlert(false);
      }, time);
    }
  }, [transition.state, transition.type, time]);

  return alert;
};
