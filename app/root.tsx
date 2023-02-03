import {
  LiveReload,
  Outlet,
  Meta,
  Links,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { ThemeProvider, CssBaseline } from "@mui/material";

import type { LinksFunction, MetaFunction } from "@remix-run/node";

import theme from "~/utils/theme";
import { getText } from "./utils/functions";

import globalStylesUrl from "~/styles/global.css";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: globalStylesUrl },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Red+Hat+Mono&display=swap",
    },
  ];
};

export const meta: MetaFunction = () => {
  return {
    keywords: getText("meta.keywords"),
    description: getText("meta.description"),
    title: getText("meta.title"),
  };
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico"></link>
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssVarsProvider />
          <Outlet />
          <CssVarsProvider />
        </ThemeProvider>
        <Scripts />
        <LiveReload />
        <ScrollRestoration />
        <CssBaseline />
      </body>
    </html>
  );
}

export { default as ErrorBoundary } from "~/components/errorBoundary";
export { default as CatchBoundary } from "~/components/catchBoundary";
