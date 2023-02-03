import { Stack, Typography, TextField, Tooltip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import Aside from "~/components/aside";

import { getText } from "~/utils/functions";

import type { InputBaseProps } from "@mui/material";
import type { User } from "~/utils/types";

type Props = {
  isMobile: boolean;
  error: boolean;
  user: User | undefined;
  onChange: InputBaseProps["onChange"];
};

function Fields({ error, user, onChange }: Omit<Props, "isMobile">) {
  return (
    <>
      <TextField
        margin="normal"
        fullWidth
        name="name"
        error={error && !user?.name}
        label={getText("campain.user.form.fields.name")}
        variant="standard"
        value={user?.name ?? ""}
        onChange={onChange}
      />
      <TextField
        margin="normal"
        fullWidth
        name="address"
        error={error && !user?.address}
        label={getText("campain.user.form.fields.address")}
        variant="standard"
        value={user?.address ?? ""}
        onChange={onChange}
      />
    </>
  );
}

export default function UserDetails({ isMobile, ...props }: Props) {
  return isMobile ? (
    <Fields {...props} />
  ) : (
    <Aside>
      <Stack direction="row">
        <Typography component="span" variant="h4">
          {getText("campain.user.form.title")}.
        </Typography>
        <Tooltip title={getText("globals.tooltips.data-storage")}>
          <InfoOutlinedIcon />
        </Tooltip>
      </Stack>
      <Fields {...props} />
    </Aside>
  );
}
