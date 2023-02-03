import { Outlet, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

import { Container } from "@mui/material";

import { links as searchLinks } from "~/components/search";
import { links as footerLinks, default as Footer } from "~/components/footer";
import Header from "~/components/header";
import Breadcrumbs from "~/components/breadcrumbs";

import { db } from "~/utils/db.server";

import type { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => {
  return [...searchLinks(), ...footerLinks()];
};

export const loader = async () => {
  return json(
    await db.campaign.findMany({
      select: {
        title: true,
        slug: true,
      },
      orderBy: {
        title: "asc",
      },
    })
  );
};

export default function Campaigns() {
  const campaigns = useLoaderData<typeof loader>();

  return (
    <>
      <Header options={campaigns} />
      <Container component="main" sx={{ p: { md: 6, xs: 2, sm: 2 } }}>
        <Breadcrumbs />
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}
