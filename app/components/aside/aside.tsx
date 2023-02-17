import { Box, Container } from "@mui/material";

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function UserDetails({ children }: Props) {
  return (
    <Container
      sx={{
        md: { width: "30%" },
      }}
    >
      <Box position="sticky" top={0}>
        {children}
      </Box>
    </Container>
  );
}
