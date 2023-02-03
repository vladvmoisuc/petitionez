/* eslint-disable import/first */
import { createCookieSessionStorage } from "@remix-run/node";

import {
  getSession,
  commitSession,
  destroySession,
} from "~/utils/sessions.server";

import type { Session } from "@remix-run/node";

jest.mock("@remix-run/node", () => ({
  createCookieSessionStorage: jest.fn(() => ({
    getSession: jest.fn(() => "get"),
    commitSession: jest.fn(() => "commit"),
    destroySession: jest.fn(() => "destroy"),
  })),
}));

describe("sessions", () => {
  it("should create the cookie session storage with the correct config", () => {
    expect(createCookieSessionStorage).toBeCalledWith({
      cookie: {
        httpOnly: true,
        maxAge: 3600,
        name: "__session",
        path: "/",
        sameSite: "lax",
        secrets: ["Cookies Secret Key"],
        secure: true,
      },
    });
  });

  it("should retrieve the current session", () => {
    expect(getSession()).toBe("get");
  });

  it("should commit to the current session", () => {
    expect(commitSession({} as Session)).toBe("commit");
  });

  it("should destroy the current session", () => {
    expect(destroySession({} as Session)).toBe("destroy");
  });
});
