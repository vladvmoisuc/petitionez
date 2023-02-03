import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Typography } from "@mui/material";

import CardGrid from "~/components/cardGrid";

import { getText } from "~/utils/functions";

import { db } from "~/utils/db.server";

import { ROUTES } from "~/utils/constants";

export const loader = async () => {
  return json(
    await db.campaign.findMany({
      select: {
        id: true,
        title: true,
        image: true,
        description: true,
        slug: true,
      },
      orderBy: { createdAt: "desc" },
    })
  );
};

export default function Campaign() {
  const campaigns = useLoaderData<typeof loader>();

  if (!campaigns?.length) {
    return (
      <Typography gutterBottom textAlign="center">
        {getText("campaigns.empty")}
      </Typography>
    );
  }

  return <CardGrid elements={campaigns} href={ROUTES.CAMPAIGNS} />;
}
