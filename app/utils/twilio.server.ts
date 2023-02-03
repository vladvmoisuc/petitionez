import sendgrid from "@sendgrid/mail";
import { readFileSync } from "fs";
import { join } from "path";

import { replace } from "~/utils/functions";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string);

const TEMPLATES = {
  OTP: {
    from: "petitionez@gmail.com",
    subject: "Cod de autentificare petitionez.ro",
    html: readFileSync(
      join(__dirname, "..", "app", "templates", "emails", "otp.html")
    ).toString(),
  },
};

type Params = {
  type: keyof typeof TEMPLATES;
  to: string;
  data: {
    [key: string]: string;
  };
};

export default {
  send: async ({ type, to, data = {} }: Params) =>
    await sendgrid.send({
      ...TEMPLATES[type],
      to,
      html: replace(data, TEMPLATES[type].html),
    }),
};
