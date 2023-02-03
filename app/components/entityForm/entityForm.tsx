import { useState } from "react";

import { Form } from "@remix-run/react";
import { Stack, Typography, Button, TextField } from "@mui/material";

import { getText } from "~/utils/functions";

import REGEXES from "~/utils/regexes";
import { INTENTS } from "~/utils/constants";

import type { InputBaseProps } from "@mui/material";

type Props = {
  loading?: boolean;
};

export default function EntityForm({ loading = false }: Props) {
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");

  const handleEmailChange: InputBaseProps["onChange"] = (event) => {
    setEmail(event.target.value);
  };

  const handleUrlChange: InputBaseProps["onChange"] = (event) => {
    setUrl(event.target.value);
  };

  return (
    <Form method="post">
      <Typography gutterBottom variant="h4" component="h1">
        {getText("entity.form.title")}
      </Typography>
      <Typography gutterBottom variant="subtitle2" color="text.secondary">
        {getText("entity.form.description")}
      </Typography>
      <Stack gap={3}>
        <TextField
          name="email"
          variant="standard"
          value={email}
          onChange={handleEmailChange}
          label={getText("entity.form.fields.email")}
        />
        <TextField
          name="url"
          variant="standard"
          value={url}
          onChange={handleUrlChange}
          label={getText("entity.form.fields.url")}
        />
        <Button
          type="submit"
          variant="contained"
          name="intent"
          disabled={loading || !REGEXES.EMAIL.test(email)}
          value={INTENTS.CREATE.ENTITY}
        >
          {loading ? getText("buttons.loading") : getText("buttons.create")}
        </Button>
      </Stack>
    </Form>
  );
}
