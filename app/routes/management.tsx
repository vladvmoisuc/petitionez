import { Outlet, Form } from "@remix-run/react";
import { redirect } from "@remix-run/node";

import { Container, Button } from "@mui/material";

import { links as searchLinks } from "~/components/search";
import Header from "~/components/header";
import Breadcrumbs from "~/components/breadcrumbs";

import { getText } from "~/utils/functions";
import {
  getLoggedUser,
  getSession,
  destroySession,
} from "~/utils/sessions.server";

import { ROUTES } from "~/utils/constants";

import type { LinksFunction, LoaderArgs, ActionArgs } from "@remix-run/node";

export const links: LinksFunction = () => {
  return [...searchLinks()];
};

export const loader = async ({ request }: LoaderArgs) => {
  const { loggedUserEmail } = await getLoggedUser(request);

  return loggedUserEmail ? null : redirect(ROUTES.LOGIN);
};

export const action = async ({ request }: ActionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));

  return redirect(ROUTES.LOGIN, {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};

export default function Campaigns() {
  return (
    <>
      <Header>
        <Form method="post">
          <Button type="submit">{getText("buttons.logout")}</Button>
        </Form>
      </Header>
      <Container component="main" sx={{ p: 6 }}>
        <Breadcrumbs />
        <Outlet />
      </Container>
    </>
  );
}
