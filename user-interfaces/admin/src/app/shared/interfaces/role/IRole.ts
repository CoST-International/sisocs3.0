import { ILink } from "../link/link";
import { IMeta } from "../meta/meta";

export interface IRole {
  data: IRoleAttributes
}
export interface IRoleData {
  data: IRoleAttributes[],
  meta: IMeta,
  links: ILink
}

export interface IRoleAttributes {
  id: string | number;
  name: string;
}
