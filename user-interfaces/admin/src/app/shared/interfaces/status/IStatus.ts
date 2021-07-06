import { ILink } from "../link/link";
import { IMeta } from "../meta/meta";
import { ISector } from "../sector/ISector";

export interface IStatus {
  data: IStatusAttributes[],
  meta: IMeta,
  links: ILink
}

export interface IStatusAttributes {
  id: string | number;
  title: string;
}
