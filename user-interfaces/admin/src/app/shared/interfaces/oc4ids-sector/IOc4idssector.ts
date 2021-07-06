import { ILink } from "../link/link";
import { IMeta } from "../meta/meta";

export interface IOc4idsSector {
  data: IOc4idsSectorAttributes[],
  meta: IMeta,
  links: ILink
}

export interface IOc4idsSectorAttributes {
  id: string | number;
  code: string;
  title: string;
}
