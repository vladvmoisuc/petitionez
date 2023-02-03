import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { ReactElement, ReactNode } from "react";

export function renderWithUser(jsx: ReactElement) {
  return {
    user: userEvent.setup({ delay: null }),
    ...render(jsx),
  };
}

export function renderWithRouter(jsx: ReactElement) {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <RouterProvider
      router={createMemoryRouter([
        {
          path: "/",
          element: children,
        },
      ])}
    />
  );

  return {
    user: userEvent.setup({ delay: null }),
    ...render(jsx, {
      wrapper: Wrapper,
    }),
  };
}
