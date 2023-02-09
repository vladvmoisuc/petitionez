import { useState } from "react";
import dayjs from "dayjs";
import { useActionData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { generate } from "otp-generator";

import { Container, Stack } from "@mui/material";

import LoginForm from "~/components/loginForm";
import Header from "~/components/header";
import Breadcrumbs from "~/components/breadcrumbs";

import { getFormData, getLog } from "~/utils/functions";

import {
  getLoggedUser,
  getSession,
  commitSession,
} from "~/utils/sessions.server";
import { db } from "~/utils/db.server";
import twilio from "~/utils/twilio.server";

import { EMAIL_TYPES, INTENTS, ROUTES, LOGIN_STATES } from "~/utils/constants";
import REGEXES from "~/utils/regexes";

import type { ActionArgs, LoaderArgs } from "@remix-run/node";

import type { InputBaseProps } from "@mui/material";

type Response = {
  type: keyof typeof LOGIN_STATES;
  error: boolean;
  email: string;
};

export const loader = async ({ request }: LoaderArgs) => {
  const { loggedUserEmail } = await getLoggedUser(request);

  return loggedUserEmail ? redirect(ROUTES.MANAGEMENT) : null;
};

export const action = async ({ request }: ActionArgs) => {
  const isProduction = process.env.NODE_ENV === "production";
  const {
    values: { email, intent, code: formCode },
  } = await getFormData(request);

  const response = {
    error: false,
    type: EMAIL_TYPES.NEW,
    email,
  };

  if (!email || !REGEXES.EMAIL.test(email)) {
    return json({ ...response, error: true }, { status: 400 });
  }
  try {
    const { id, code, admin, codeGeneratedAt } =
      await db.user.findUniqueOrThrow({
        where: { email },
        select: { code: true, admin: true, codeGeneratedAt: true, id: true },
      });

    if (intent === INTENTS.VALIDATE) {
      if (formCode?.length !== 6 || formCode !== code) {
        throw new Error();
      }

      await db.user.update({
        where: {
          email: email.trim(),
        },
        data: {
          code: "",
        },
      });

      const session = await getSession(request.headers.get("Cookie"));

      session.set("email", email);
      session.set("admin", admin);
      session.set("id", id);

      return redirect(ROUTES.MANAGEMENT, {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }

    if (intent === INTENTS.GENERATE) {
      if (code && dayjs().diff(codeGeneratedAt, "minutes") < 30) {
        response.type = EMAIL_TYPES.OLD;

        console.log(getLog("otp.already-sent"), code);
      } else {
        const randomCode = generate(6, {
          digits: true,
          lowerCaseAlphabets: false,
          upperCaseAlphabets: false,
          specialChars: false,
        });

        await db.user.update({
          where: {
            email: email.trim(),
          },
          data: {
            code: isProduction ? randomCode : "123456",
            codeGeneratedAt: new Date(),
          },
        });

        if (isProduction) {
          await twilio.send({
            to: email,
            type: "OTP",
            data: {
              code: randomCode,
            },
          });
        }

        console.log(getLog("otp.sent"), randomCode);
      }
    }
  } catch (error) {
    response.error = true;
  }

  return json(response);
};

export default function Login() {
  const {
    error,
    type,
    email: formEmail = "",
  } = (useActionData() as Response) ?? {};
  const [email, setEmail] = useState(formEmail);
  const [code, setCode] = useState("");

  const handleEmailChange: InputBaseProps["onChange"] = (event) => {
    setEmail(event.target.value);
  };

  const handleCodeChange: InputBaseProps["onChange"] = (event) => {
    setCode(event.target.value);
  };

  return (
    <>
      <Header className="horizontally-centered" />
      <Container component="main" sx={{ p: 6 }}>
        <Breadcrumbs />
        <Stack alignItems="center" sx={{ mt: 4 }}>
          <LoginForm
            type={
              error ? (LOGIN_STATES.ERROR as keyof typeof LOGIN_STATES) : type
            }
            code={code}
            email={email?.trim()}
            handleEmailChange={handleEmailChange}
            handleCodeChange={handleCodeChange}
          />
        </Stack>
      </Container>
    </>
  );
}
