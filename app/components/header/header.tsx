import { Link } from "@remix-run/react";
import { AppBar, Toolbar } from "@mui/material";

import Search from "~/components/search";

type Props = {
  options?: { title: string; slug: string }[];
  children?: JSX.Element;
  className?: string;
};

export default function Header({ className = "", options, children }: Props) {
  return (
    <AppBar className={className}>
      <Toolbar
        sx={{
          p: 1,
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          alignItems: {
            xs: "center",
          },
        }}
      >
        <Link to="/campaigns" prefetch="intent">
          <img src="/logo.svg" height={34} alt="logo" />
        </Link>
        {children ? (
          children
        ) : options?.length ? (
          <Search options={options} />
        ) : null}
      </Toolbar>
    </AppBar>
  );
}
