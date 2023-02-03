import { renderHook, act } from "@testing-library/react";

import { useLocalStorage, useAlert } from "~/utils/hooks";

import type { Transition } from "@remix-run/react/dist/transition";

describe("useAlert", () => {
  it("should toggle the return value when the correct transition is received", () => {
    const { result, rerender } = renderHook(
      ({ transition, time }) => useAlert(transition, time),
      {
        initialProps: { transition: {} as Transition, time: 500 },
      }
    );

    expect(result.current).toEqual(false);

    rerender({
      transition: {
        state: "loading",
        type: "actionReload",
      } as Transition,
      time: 500,
    });

    expect(result.current).toEqual(true);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toEqual(false);
  });
});

describe("useLocalStorage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("should return the parsed stored data", () => {
    localStorage.setItem("user", '{"name":"John"}');

    const { result } = renderHook(() => useLocalStorage("user"));

    expect(result.current[0]).toEqual({ name: "John" });
  });

  it("should update the storage data when the callback is called", () => {
    expect(localStorage.getItem("user")).toEqual(null);

    const { result } = renderHook(() => useLocalStorage("user"));

    expect(result.current[0]).toEqual(undefined);

    act(() => {
      result.current[1]({ name: "John", age: 30 });
    });

    expect(localStorage.getItem("user")).toEqual('{"name":"John","age":30}');
    expect(result.current[0]).toEqual({ name: "John", age: 30 });
  });
});
