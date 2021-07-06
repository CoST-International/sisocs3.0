import { ICity } from '../city/ICity';
import { ILink } from "../link/link";
import { IMeta } from "../meta/meta";
import { IState } from '../state/IState';

export interface ILocation {
  data: ILocationAttributes[],
  meta: IMeta,
  links: ILink
}

export interface ILocationAttributes {
  id: number | string;
  city_id: number | string;
  state_id: number | string;
  status_id?: number | string;
  project_id?: number | string;
  states?: IState;
  cities?: ICity;
}
