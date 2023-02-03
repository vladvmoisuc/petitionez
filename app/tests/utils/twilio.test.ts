/* eslint-disable import/first */
import sendgrid from "@sendgrid/mail";

import twilio from "~/utils/twilio.server";

jest.mock("@sendgrid/mail");
jest.mock("fs", () => ({
  readFileSync: jest.fn(() => "File content, {{date}}."),
}));
jest.mock("path", () => ({
  join: jest.fn(),
}));

const config = {
  type: "OTP",
  to: "random@gmail.com",
  data: { date: "01/01/2000" },
} as const;

describe("twilio", () => {
  it("should set the API key", () => {
    expect(sendgrid.setApiKey).toBeCalledWith("Sendgrid API Key");
  });

  it("should send an email using the correct configuration", async () => {
    await twilio.send(config);

    expect(sendgrid.send).toBeCalledWith({
      from: "petitionez@gmail.com",
      html: "File content, 01/01/2000.",
      subject: "Cod de autentificare petitionez.ro",
      to: "random@gmail.com",
    });
  });
});
