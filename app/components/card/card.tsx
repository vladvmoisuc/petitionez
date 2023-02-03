import dayjs from "dayjs";

import { Link } from "@remix-run/react";
import {
  Card as BaseCard,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import { DATE_FORMATS, SLUGS } from "~/utils/constants";

type Props = {
  id?: string | number;
  href?: string;
  image?: string;
  createdAt?: string | Date;
  slug?: string;
  title?: string;
  description?: string;
  slugRedirect?: boolean;
};

export default function Card({
  id,
  href,
  slug,
  image,
  title,
  createdAt,
  description,
  slugRedirect = true,
}: Props) {
  return (
    <BaseCard sx={{ height: 1 }}>
      <CardActionArea
        to={`${href}/${slugRedirect || slug === SLUGS.CREATE ? slug : id}`}
        sx={{ p: 2, height: 1 }}
        component={Link}
        prefetch="intent"
      >
        {image && <CardMedia component="img" height={300} image={image} />}
        <CardContent>
          {createdAt && (
            <Typography
              gutterBottom
              variant="subtitle2"
              color="text.secondary"
              textAlign="center"
            >
              {dayjs(createdAt).format(DATE_FORMATS.STANDARD)}
            </Typography>
          )}
          {title && (
            <Typography
              gutterBottom
              variant="h5"
              component="h1"
              textAlign="center"
              className="line-clamp-2"
            >
              {title}
            </Typography>
          )}
          {description && (
            <Typography
              className="line-clamp-2"
              variant="body2"
              color="text.secondary"
              textAlign="center"
            >
              {description}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </BaseCard>
  );
}
