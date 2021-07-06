import { ICity } from "../city/ICity";
import { ILink } from "../link/link";
import { IMeta } from "../meta/meta";
import { ISector } from "../sector/ISector";

export interface IState {
  data: IStateAttributes[],
  meta: IMeta,
  links: ILink
}

export interface IStateAttributes {
  id: string | number;
  state_name: string;
  cities: ICity
}
