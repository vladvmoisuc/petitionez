import ro from "~/content/ro.json";
import errors from "~/content/errors.json";
import logs from "~/content/logs.json";

import type { DynamicObject } from "~/utils/types";

export function waitFor(time: number = 500) {
  return new Promise<void>((resolve) =>
    setTimeout(() => {
      resolve();
    }, time)
  );
}

export function replace(data: { [key: string]: string }, content: string) {
  return Object.keys(data).reduce(
    (text, key) => text.replace(new RegExp(`{{${key}}}`, "g"), data[key]),
    content
  );
}

function extractContent(
  source: DynamicObject,
  key: string,
  values?: DynamicObject
): string {
  const content = source[key as keyof typeof source] ?? "";

  return values ? replace(values, content) : content;
}

export function getText(key: string, values?: DynamicObject): string {
  return extractContent(ro, key, values);
}

export function getError(key: string, values?: DynamicObject): string {
  return extractContent(errors, key, values);
}

export function getLog(key: string, values?: DynamicObject): string {
  return extractContent(logs, key, values);
}

export async function getFormData(
  request: Request
): Promise<{ keys: string[]; values: DynamicObject }> {
  const data = await request.formData();
  const keys = [...data.keys()];

  const values = keys.reduce((values, key) => {
    return {
      ...values,
      [key]: data.get(key),
    };
  }, {});

  return {
    keys,
    values,
  };
}
