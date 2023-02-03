import type { LinksFunction } from "@remix-run/node";

import { Box, Typography } from "@mui/material";

import { getText } from "~/utils/functions";

import stylesUrl from "./style.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export default function Footer() {
  return (
    <Box className="Footer vertically-centered ">
      <Typography gutterBottom variant="subtitle2" color="text.secondary">
        {getText("footer.created-by")}
        <a
          href="https://www.linkedin.com/in/vladmoisuc/"
          target="_blank"
          rel="noreferrer"
        >
          {getText("footer.creator")}
        </a>
      </Typography>
    </Box>
  );
}
