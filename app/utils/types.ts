import type { ChangeEventHandler } from "react";

export type User = {
  name?: string;
  address?: string;
};

export type Entity = {
  id?: string;
  email: string;
  url: string;
};

export type Entities = Entity[];

export type Template = {
  id?: string;
  title: string;
  content: string;
  entities: Entity[];
};

export type Templates = Template[];

export type ChangeHandler<T = HTMLInputElement> = (
  event: ChangeEventHandler<T>
) => void;

export type CurryiedChangeHandler<T = string, R = void> = (data?: T) => () => R;

export type DynamicObject = {
  [key: string]: string;
};
