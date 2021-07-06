import { ILink } from "../link/link";
import { IMeta } from "../meta/meta";
import { ISector } from "../sector/ISector";

export interface ISubsector {
  data: ISubsectorAttributes[],
  meta: IMeta,
  links: ILink
}

export interface ISubsectorAttributes {
  id: string | number;
  subsector_name: string;
  sectors_id: number | string;
  sector?: ISector
}
