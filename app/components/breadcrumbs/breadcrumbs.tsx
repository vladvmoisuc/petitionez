import { useEffect, useState } from "react";

import { Link } from "@remix-run/react";
import { Breadcrumbs as DefaultBreadcrumbs } from "@mui/material";

import { getText } from "~/utils/functions";

import REGEXES from "~/utils/regexes";

import type { ReactNode } from "react";

export default function Breadcrumbs() {
  const [routes, setRoutes] = useState([""]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, ...routes] = window.location.pathname.split("/");

    setRoutes(routes);
  }, []);

  return (
    <DefaultBreadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
      {routes.map((route) => {
        const breadcrumb = getText(`breadcrumbs.${route}`);

        if (route === routes[routes.length - 1]) {
          return breadcrumb ? (
            <span key={route}>{breadcrumb as ReactNode}</span>
          ) : (
            <span key={route}>
              {route
                .replace(REGEXES.DASHES, " ")
                .replace(REGEXES.START_LETTER, (letter) =>
                  letter.toUpperCase()
                )}
            </span>
          );
        }

        return (
          <Link to={`/${route}`} key={route} prefetch="intent">
            {breadcrumb as ReactNode}
          </Link>
        );
      })}
    </DefaultBreadcrumbs>
  );
}
