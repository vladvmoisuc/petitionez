import { Link } from "@remix-run/react";
import { Stack, Button, Typography } from "@mui/material";

import { getText } from "~/utils/functions";

export default function CatchBoundary() {
  return (
    <Stack
      sx={{ width: 1, height: 1 }}
      justifyContent="center"
      alignItems="center"
    >
      <img src="/logo.svg" width={200} alt="logo" />
      <Typography gutterBottom textAlign="center" sx={{ mt: 4 }}>
        {getText("404.description")}
      </Typography>
      <Stack gap={2}>
        <Button variant="contained" component={Link} to="/" prefetch="intent">
          {getText("buttons.go-home")}
        </Button>
      </Stack>
    </Stack>
  );
}
