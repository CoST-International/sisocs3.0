import { ILink } from "../link/link";
import { IMeta } from "../meta/meta";

export interface IPurpose {
  data: IPurposeAttributes[],
  meta: IMeta,
  links: ILink
}

export interface IPurposeAttributes {
  id: string | number;
  code: string;
  purpose_name: string;
}
