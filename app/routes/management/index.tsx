import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

import CardGrid from "~/components/cardGrid";

import { getText } from "~/utils/functions";

import { getLoggedUser } from "~/utils/sessions.server";
import { db } from "~/utils/db.server";

import { ROUTES, SLUGS } from "~/utils/constants";

import type { LoaderArgs } from "@remix-run/node";

export const loader = async ({ request }: LoaderArgs) => {
  const { isAdmin, loggedUserEmail } = await getLoggedUser(request);

  return json(
    await db.campaign.findMany({
      where: {
        ...(isAdmin
          ? {}
          : {
              author: {
                email: loggedUserEmail,
              },
            }),
      },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        createdAt: true,
      },
    })
  );
};

export default function Campaigns() {
  const campaigns = useLoaderData<typeof loader>();

  return (
    <CardGrid
      slugRedirect={false}
      elements={campaigns}
      href={ROUTES.MANAGEMENT}
      defaultElement={{
        createdAt: new Date(),
        slug: SLUGS.CREATE,
        href: ROUTES.MANAGEMENT,
        title: getText("campaigns.create.new.title"),
        description: getText("campaigns.create.new.description"),
      }}
    />
  );
}
