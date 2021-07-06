import { ILink } from "../link/link";
import { IMeta } from "../meta/meta";

export interface ICurrency {
  data: ICurrencyAttributes[],
  meta: IMeta,
  links: ILink
}

export interface ICurrencyAttributes {
  id: string | number;
  name: string;
  code: string;
}
