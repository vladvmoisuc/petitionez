import { Form, Link } from "@remix-run/react";
import { Stack, Typography, Button, TextField, Input } from "@mui/material";

import { getText } from "~/utils/functions";

import { LOGIN_STATES, INTENTS } from "~/utils/constants";
import REGEXEX from "~/utils/regexes";

import type { InputBaseProps } from "@mui/material";

type Props = {
  type?: keyof typeof LOGIN_STATES;
  code: string;
  email: string;
  handleCodeChange: InputBaseProps["onChange"];
  handleEmailChange: InputBaseProps["onChange"];
};

export default function LoginForm({
  type = LOGIN_STATES.DEFAULT as keyof typeof LOGIN_STATES,
  code,
  email,
  handleCodeChange,
  handleEmailChange,
}: Props) {
  const isError = type === LOGIN_STATES.ERROR;
  const isNew = type === LOGIN_STATES.NEW;
  const isOld = type === LOGIN_STATES.OLD;
  const isDefault = type === LOGIN_STATES.DEFAULT;

  return (
    <Form method="post" className="horizontally-centered full-width">
      <Stack sx={{ width: { xs: 1, md: 1 / 3 } }} gap={3}>
        <Typography gutterBottom variant="h4" component="h1">
          {getText(`login.${type}.title`)}
        </Typography>
        <Typography gutterBottom variant="subtitle2" color="text.secondary">
          {getText(`login.${type}.description`)}
        </Typography>
        {!isError && (
          <Input
            name="email"
            value={email}
            onChange={handleEmailChange}
            placeholder={getText("login.fields.email")}
            readOnly={!isDefault}
          />
        )}
        {(isNew || isOld) && (
          <TextField
            name="code"
            variant="standard"
            value={code}
            onChange={handleCodeChange}
            label={getText("login.fields.code")}
          />
        )}
        {isError ? (
          <Button
            variant="contained"
            component={Link}
            to="/login"
            prefetch="intent"
          >
            {getText("login.buttons.retry")}
          </Button>
        ) : (
          <Button
            type="submit"
            variant="contained"
            name="intent"
            value={isDefault ? INTENTS.GENERATE : INTENTS.VALIDATE}
            disabled={isDefault ? !REGEXEX.EMAIL.test(email) : code.length < 6}
          >
            {isDefault
              ? getText("login.buttons.login")
              : getText("login.buttons.validate")}
          </Button>
        )}
      </Stack>
    </Form>
  );
}
