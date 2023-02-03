import { useState } from "react";
import invariant from "tiny-invariant";
import dayjs from "dayjs";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

import {
  Stack,
  Typography,
  Container,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import Steps from "~/components/steps";
import UserDetails from "~/components/userDetails";
import { links as templateLinks } from "~/components/template";

import { getText, getError } from "~/utils/functions";
import { useLocalStorage } from "~/utils/hooks";

import { db } from "~/utils/db.server";

import { DATE_FORMATS } from "~/utils/constants";

import type { ChangeEvent } from "react";
import type { LinksFunction, LoaderArgs } from "@remix-run/node";

import type { User } from "~/utils/types";

export const links: LinksFunction = () => {
  return [...templateLinks()];
};

export const loader = async ({ params: { slug } }: LoaderArgs) => {
  invariant(slug, getError("slug-expected"));

  return json(
    await db.campaign.findUnique({
      where: {
        slug,
      },
      select: {
        title: true,
        description: true,
        createdAt: true,
        templates: {
          select: {
            title: true,
            content: true,
            entities: {
              select: {
                email: true,
                url: true,
              },
            },
          },
        },
        author: {
          select: {
            name: true,
          },
        },
      },
    })
  );
};

export default function Campaign() {
  const campaign = useLoaderData<typeof loader>();
  const theme = useTheme();
  const [user, setLocalStorage] = useLocalStorage<User>("user");
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [error, setError] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError(false);

    const {
      target: { name, value },
    } = event;

    setLocalStorage({
      ...user,
      [name]: value,
    });
  };

  const handleError = () => {
    setError(true);
  };

  if (!campaign) {
    throw new Error();
  }

  return (
    <Stack
      divider={<Divider orientation="vertical" flexItem />}
      direction={{ sm: "column", md: "row" }}
      spacing={2}
    >
      <Container
        maxWidth={false}
        sx={{
          p: 0,
          m: 0,
          minWidth: {
            sx: "100%",
            md: "70%",
          },
        }}
      >
        {campaign.author && (
          <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 4 }}>
            {getText("campain.posted-by", {
              name: campaign.author.name,
              date: dayjs(campaign.createdAt).format(DATE_FORMATS.STANDARD),
            })}
          </Typography>
        )}
        <Typography gutterBottom component="h1" variant="h3">
          {campaign.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {campaign.description}
        </Typography>
        <Steps
          steps={campaign.templates}
          user={user}
          isMobile={isMobile}
          onError={handleError}
        >
          <UserDetails
            isMobile={isMobile}
            user={user}
            error={error}
            onChange={handleChange}
          />
        </Steps>
      </Container>
      {!isMobile && (
        <UserDetails
          isMobile={isMobile}
          user={user}
          error={error}
          onChange={handleChange}
        />
      )}
    </Stack>
  );
}
