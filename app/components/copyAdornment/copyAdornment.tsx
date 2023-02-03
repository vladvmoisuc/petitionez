import { InputAdornment, IconButton } from "@mui/material";
import ContentCopySharpIcon from "@mui/icons-material/ContentCopySharp";

import type { CurryiedChangeHandler } from "~/utils/types";

type Props = {
  onCopy: CurryiedChangeHandler;
  text: string;
};

export default function CopyAdornment({ onCopy, text }: Props) {
  return (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={onCopy(text)}
        edge="end"
      >
        <ContentCopySharpIcon />
      </IconButton>
    </InputAdornment>
  );
}
