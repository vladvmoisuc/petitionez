import type { LinksFunction } from "@remix-run/node";

import { Box } from "@mui/material";

import stylesUrl from "./style.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

type Props = {};

// eslint-disable-next-line no-empty-pattern
export default function Component({}: Props) {
  return <Box className="Component"></Box>;
}
