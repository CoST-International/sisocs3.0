import { ILink } from "../link/link";
import { IMeta } from "../meta/meta";
import { ISector } from "../sector/ISector";

export interface ICity {
  data: ICityAttributes[],
  meta: IMeta,
  links: ILink
}

export interface ICityAttributes {
  id: string | number;
  city_code: string;
  city_name: string;
  states_id: number | string;
}
