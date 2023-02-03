import { Grid } from "@mui/material";

import Card from "~/components/card";

type Element = { [key: string]: any };

type Props = {
  elements: Element[];
  defaultElement?: Element;
  href: string;
  slugRedirect?: boolean;
};

export default function CardGrid({
  elements,
  defaultElement,
  href,
  slugRedirect,
}: Props) {
  return (
    <Grid container spacing={6}>
      <>
        {defaultElement && (
          <Grid item xs={12} md={6}>
            <Card {...defaultElement} slugRedirect={slugRedirect} />
          </Grid>
        )}
        {elements.map((props) => (
          <Grid item xs={12} md={6} key={props.id}>
            <Card {...props} href={href} slugRedirect={slugRedirect} />
          </Grid>
        ))}
      </>
    </Grid>
  );
}
