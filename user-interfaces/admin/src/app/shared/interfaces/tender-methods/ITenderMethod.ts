import { IOfferer, IOffererAttributes } from '../offerer/offerer';

import { ILink } from '../link/link';
import { IMeta } from '../meta/meta';

export interface ITenderMethod {
  data: ITenderMethodAttributes,
}

export interface ITenderMethodData {
  data: ITenderMethodAttributes[],
  meta?: IMeta | undefined,
  link?: ILink | undefined
}
export interface ITenderMethodAttributes {
  id: string | number;
  code: string;
  name: string;
}

