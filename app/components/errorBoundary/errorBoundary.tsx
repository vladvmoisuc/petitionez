import { Link } from "@remix-run/react";
import { Stack, Button, Typography } from "@mui/material";

import { getText, getError } from "~/utils/functions";

export default function ErrorBoundary({ error }: { error: string }) {
  console.error(getError("unexpected"), error);

  return (
    <Stack
      sx={{ width: 1, height: 1 }}
      justifyContent="center"
      alignItems="center"
    >
      <img src="/logo.svg" width={200} alt="logo" />
      <Typography gutterBottom textAlign="center" sx={{ mt: 4 }}>
        {getText("error-boundary.description")}
      </Typography>
      <Stack gap={2}>
        <Button variant="contained" component={Link} to="/" prefetch="intent">
          {getText("buttons.go-home")}
        </Button>
      </Stack>
    </Stack>
  );
}
