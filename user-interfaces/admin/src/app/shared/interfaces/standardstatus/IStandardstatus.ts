import { ILink } from "../link/link";
import { IMeta } from "../meta/meta";
import { ISector } from "../sector/ISector";

export interface IStandardstatus {
  data: IStandardstatusAttributes[],
  meta: IMeta,
  links: ILink
}

export interface IStandardstatusAttributes {
  id: string | number;
  code: string;
  name: string;
  name_local: string;
  sections_id: number | string;
}
