import type { LinksFunction } from "@remix-run/node";

import { Autocomplete, TextField } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

import { waitFor, getText } from "~/utils/functions";

import stylesUrl from "./style.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

type Props = {
  options: { title: string; slug: string }[];
};

export default function Search({ options }: Props) {
  return (
    <Autocomplete
      className="Search"
      options={options.map(({ title }) => title)}
      noOptionsText={getText("global.search.empty")}
      sx={{
        width: {
          xs: "90%",
          sm: 1 / 2,
          md: 1 / 3,
        },
      }}
      onChange={async (_, value) => {
        await waitFor();

        window.location.href = `/campaigns/${
          options.find(({ title }) => title === value)?.slug
        }`;
      }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            placeholder={getText("global.search.placeholder")}
            variant="standard"
            InputProps={{
              ...params.InputProps,
              startAdornment: <SearchIcon sx={{ mr: 2 }} />,
              endAdornment: null,
            }}
          />
        );
      }}
    />
  );
}
