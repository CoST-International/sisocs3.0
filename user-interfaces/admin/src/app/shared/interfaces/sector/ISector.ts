import { ILink } from "../link/link";
import { IMeta } from "../meta/meta";

export interface ISector {
  data: ISectorAttributes[],
  meta: IMeta,
  links: ILink
}

export interface ISectorAttributes {
  id: string | number;
  code: string;
  sector_name: string;
}
