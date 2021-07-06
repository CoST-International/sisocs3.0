import { ILink } from "../link/link";
import { IMeta } from "../meta/meta";

export interface IFundingsource {
  data: IFundingsourceAttributes[],
  meta: IMeta,
  links: ILink
}

export interface IFundingsourceAttributes {
  id: string | number;
  name: string;
}
