import { ILink } from '../link/link';
import { IMeta } from '../meta/meta';

export interface IOfferer {
  data: IOffererAttributes,
}
export interface IOffererData {
  data: IOffererAttributes[],
  meta?: IMeta | undefined,
  link?: ILink | undefined
}
export interface IOffererAttributes {
  id: string | number;
  name: string;
  legal_name: string;
}

