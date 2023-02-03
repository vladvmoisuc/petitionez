import { useEffect, useState } from "react";
import type { LinksFunction } from "@remix-run/node";

import {
  Box,
  Button,
  Autocomplete,
  Chip,
  TextField,
  Input,
  InputLabel,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import CopyAdornment from "~/components/copyAdornment";

import { replace, getText } from "~/utils/functions";

import type {
  Template as TemplateType,
  User,
  Entities,
  CurryiedChangeHandler,
} from "~/utils/types";

import stylesUrl from "./style.css";

type Props = TemplateType & {
  editable?: boolean;
  onCopy?: CurryiedChangeHandler;
  user?: User;
  options?: Entities;
  prefix?: string | number;
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export default function Template({
  editable,
  options,
  entities,
  prefix,
  user,
  title,
  id,
  content,
  onCopy,
}: Props) {
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const emails = entities.map(({ email }) => email);
  const joinedEmails = emails.join(",");
  const message = !editable ? replace(user ?? {}, content) : content;
  const messageProps = editable
    ? { defaultValue: message ? message : getText("templates.campaigns") }
    : {
        value: message ? message : getText("templates.campaigns"),
      };
  const emailsIds = selectedEmails.map(
    (email) => options?.find((option) => option.email === email)?.id ?? ""
  );

  useEffect(() => {
    if (!selectedEmails?.length) {
      setSelectedEmails(emails);
    }
  }, [setSelectedEmails, selectedEmails, emails]);

  return (
    <Box sx={{ mt: 2 }} className="Template">
      <InputLabel htmlFor="to">{getText("template.to")}</InputLabel>
      <Autocomplete
        readOnly={!editable}
        defaultValue={emails}
        multiple
        options={options?.length ? options?.map(({ email }) => email) : emails}
        popupIcon={null}
        onChange={(_, emails) => setSelectedEmails(emails)}
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => (
            // eslint-disable-next-line react/jsx-key
            <Chip
              {...getTagProps({ index })}
              variant="outlined"
              label={option}
              onDelete={editable ? getTagProps({ index }).onDelete : undefined}
            />
          ))
        }
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              fullWidth
              id="to"
              sx={{ mb: 3 }}
              variant="standard"
              InputProps={{
                ...params.InputProps,
                endAdornment: onCopy ? (
                  <CopyAdornment text={joinedEmails} onCopy={onCopy} />
                ) : null,
              }}
            />
          );
        }}
      />
      {/* 
        We're relying to this trick in order to get the list of selected emails 
        and the id for the action.
      */}
      {editable && (
        <TextField
          type="hidden"
          name={`${prefix}.to`}
          value={emailsIds}
          sx={{ display: "none" }}
        />
      )}
      {editable && (
        <TextField
          type="hidden"
          name={`${prefix}.id`}
          value={id}
          sx={{ display: "none" }}
        />
      )}
      <InputLabel htmlFor="subject">{getText("template.subject")}</InputLabel>
      <Input
        sx={{ mb: 3 }}
        fullWidth
        id="subject"
        name={`${prefix}.subject`}
        defaultValue={title}
        readOnly={!editable}
        endAdornment={
          onCopy ? <CopyAdornment text={title} onCopy={onCopy} /> : null
        }
      />
      <InputLabel htmlFor="message">{getText("template.message")}</InputLabel>
      <Input
        id="message"
        sx={{ mb: 3 }}
        fullWidth
        multiline
        rows={20}
        name={`${prefix}.message`}
        readOnly={!editable}
        endAdornment={
          onCopy ? <CopyAdornment text={message} onCopy={onCopy} /> : null
        }
        {...messageProps}
      />
      {!editable && (
        <Button
          component="a"
          variant="contained"
          endIcon={<SendIcon />}
          sx={{ mb: 3 }}
          href={`mailto:${joinedEmails}?subject=${title}&body=${encodeURIComponent(
            message
          )}`}
          fullWidth
        >
          {getText("buttons.send")}
        </Button>
      )}
    </Box>
  );
}
