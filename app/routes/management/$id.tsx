import { useEffect, useState } from "react";
import { get } from "lodash";
import {
  useLoaderData,
  useTransition,
  Form,
  useLocation,
} from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

import {
  Stack,
  Typography,
  Container,
  Divider,
  InputLabel,
  Input,
  Snackbar,
  Alert,
  Button,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import Aside from "~/components/aside";
import EntityForm from "~/components/entityForm";
import Template from "~/components/template";

import { getText, getError, getFormData } from "~/utils/functions";
import { useAlert } from "~/utils/hooks";

import { db } from "~/utils/db.server";
import { getLoggedUser } from "~/utils/sessions.server";

import { SLUGS, ROUTES, INTENTS, LINKS } from "~/utils/constants";
import REGEXES from "~/utils/regexes";

import type { Template as TemplateType } from "@prisma/client";
import type { LoaderArgs, ActionArgs } from "@remix-run/node";

export const loader = async ({ request, params: { id } }: LoaderArgs) => {
  invariant(id, getError("id-expected"));

  const campaign = await db.campaign.findUnique({
    where: {
      id,
    },
    select: {
      title: true,
      description: true,
      createdAt: true,
      image: true,
      author: {
        select: {
          email: true,
        },
      },
      templates: {
        select: {
          id: true,
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
    },
  });

  const { loggedUserEmail, isAdmin } = await getLoggedUser(request);

  if (
    isAdmin ||
    id === SLUGS.CREATE ||
    get(campaign, "author.email") === loggedUserEmail
  ) {
    return json({
      entities: await db.entity.findMany({
        select: {
          id: true,
          email: true,
          url: true,
        },
      }),
      campaign,
    });
  }

  return redirect(ROUTES.MANAGEMENT);
};

export const action = async ({ request, params: { id } }: ActionArgs) => {
  invariant(id, getError("id-expected"));

  const { loggedUserId, loggedUserEmail, isAdmin } = await getLoggedUser(
    request
  );

  const { keys, values } = await getFormData(request);

  const { email, image, url, title, description, intent } = values;

  const campaign = await db.campaign.findUnique({
    where: {
      id,
    },
    select: {
      author: {
        select: { email: true },
      },
    },
  });

  const hasPermission =
    isAdmin || get(campaign, "author.email") === loggedUserEmail;

  if (hasPermission && intent === INTENTS.DELETE.CAMPAIGN) {
    await db.campaign.delete({
      where: {
        id,
      },
    });

    return redirect(ROUTES.MANAGEMENT);
  }

  if (
    hasPermission &&
    intent === INTENTS.CREATE.ENTITY &&
    REGEXES.EMAIL.test(email)
  ) {
    await db.entity.create({
      data: {
        url,
        email,
      },
    });

    return null;
  }

  if (
    [INTENTS.CREATE.CAMPAIGN, INTENTS.UPDATE.CAMPAIGN].includes(intent) &&
    title &&
    description
  ) {
    const templates = keys
      .filter((key) => key.includes(".id"))
      .map((key) => {
        const [prefix] = key.split(".");

        const {
          [`${prefix}.subject`]: title,
          [`${prefix}.message`]: content,
          [`${prefix}.to`]: entities,
        } = values;

        return {
          title,
          content,
          entities: {
            connect: entities.split(",").map((id) => ({ id })),
          },
        };
      });

    const data = {
      title,
      description,
      image,
      slug: title.toLowerCase().replace(REGEXES.SPACES, "-"),
      authorId: loggedUserId,
      templates: { create: templates as unknown as TemplateType[] },
    };

    if (intent === INTENTS.UPDATE.CAMPAIGN && hasPermission) {
      await db.template.deleteMany({
        where: {
          campaignId: id,
        },
      });

      await db.campaign.update({
        where: {
          id,
        },
        data,
      });

      return null;
    } else {
      await db.campaign.create({
        data,
      });

      return redirect(ROUTES.MANAGEMENT);
    }
  }
};

export default function Campaign() {
  const [numberOfTemplates, setNumberOfTemplates] = useState(1);
  const transition = useTransition();
  const location = useLocation();
  const hasAlert = useAlert(transition);

  const { campaign, entities } = useLoaderData<typeof loader>();

  const { title, description, image, templates } = campaign ?? {};
  const isCreating = location.pathname.split("/")[2] === SLUGS.CREATE;

  const handleTemplateAdd = () => {
    setNumberOfTemplates(numberOfTemplates + 1);
  };

  const handleTemplateRemoval = () => {
    if (numberOfTemplates > 1) {
      setNumberOfTemplates(numberOfTemplates - 1);
    }
  };

  useEffect(() => {
    setNumberOfTemplates(templates?.length ?? 1);
  }, [templates]);

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
          mb: 3,
          minWidth: {
            sx: "100%",
            md: "70%",
          },
        }}
      >
        <Typography gutterBottom component="h1" variant="h3">
          {title ? title : getText("campaigns.create.new.title")}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {description
            ? description
            : getText("campaigns.create.new.description")}
        </Typography>
        <Form method="post">
          <InputLabel htmlFor="title" sx={{ mt: 4 }}>
            {getText("campaigns.create.title")}
          </InputLabel>
          <Input
            sx={{ mb: 3 }}
            fullWidth
            id="title"
            name="title"
            defaultValue={title}
          />
          <InputLabel htmlFor="description">
            {getText("campaigns.create.description")}
          </InputLabel>
          <Input
            sx={{ mb: 3 }}
            fullWidth
            name="description"
            id="description"
            rows={3}
            multiline
            defaultValue={description}
          />
          <InputLabel htmlFor="title" sx={{ mt: 4 }}>
            {getText("campaigns.create.image")}
            <Tooltip title={getText("globals.tooltips.image-upload")}>
              <InfoOutlinedIcon />
            </Tooltip>
          </InputLabel>
          <Input
            sx={{ mb: 3 }}
            fullWidth
            id="image"
            name="image"
            defaultValue={image}
          />
          <Typography
            sx={{ mt: 2, mb: 3 }}
            gutterBottom
            component="h2"
            variant="h5"
          >
            {getText("campaigns.template.title")}
          </Typography>
          {Array.from({ length: numberOfTemplates }).map((_, index) => (
            <Template
              key={index}
              prefix={index}
              editable
              options={entities}
              entities={templates?.[index]?.entities ?? []}
              title={templates?.[index]?.title ?? ""}
              content={templates?.[index]?.content ?? ""}
              id={templates?.[index]?.id ?? ""}
            />
          ))}
          <Button
            variant="outlined"
            endIcon={<DeleteOutlineIcon />}
            sx={{ mt: 3 }}
            disabled={numberOfTemplates < 2}
            fullWidth
            onClick={handleTemplateRemoval}
          >
            {getText("template.buttons.remove")}
          </Button>
          <Button
            variant="outlined"
            endIcon={<AddIcon />}
            sx={{ mt: 3 }}
            fullWidth
            onClick={handleTemplateAdd}
          >
            {getText("template.buttons.add")}
          </Button>
          <Button
            type="submit"
            variant="contained"
            name="intent"
            fullWidth
            disabled={transition.state === "submitting"}
            value={
              isCreating ? INTENTS.CREATE.CAMPAIGN : INTENTS.UPDATE.CAMPAIGN
            }
            sx={{ mt: 2 }}
          >
            {transition.state === "submitting"
              ? getText("buttons.loading")
              : isCreating
              ? getText("buttons.create")
              : getText("buttons.update")}
          </Button>
          <Button
            type="submit"
            color="error"
            variant="contained"
            name="intent"
            fullWidth
            disabled={isCreating}
            value={INTENTS.DELETE.CAMPAIGN}
            sx={{ mt: 2 }}
          >
            {getText("buttons.delete")}
          </Button>
        </Form>
        <Snackbar
          open={hasAlert}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert>{getText("globals.alerts.saved")}</Alert>
        </Snackbar>
      </Container>
      <Aside>
        <>
          <EntityForm loading={transition.state === "submitting"} />
          <Divider />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 2, mb: 2 }}
          >
            {getText("campaigns.create.new.image-upload")}
          </Typography>
          <Button
            component="a"
            href={LINKS.POSTIMAGES.URL}
            target="_blank"
            variant="outlined"
          >
            {LINKS.POSTIMAGES.NAME}
          </Button>
        </>
      </Aside>
    </Stack>
  );
}
