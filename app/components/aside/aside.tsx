import { Box, Container } from "@mui/material";

type Props = {
  children: JSX.Element | JSX.Element[];
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
