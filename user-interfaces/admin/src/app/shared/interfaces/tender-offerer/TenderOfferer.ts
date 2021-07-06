import { IOfferer, IOffererAttributes, IOffererData } from '../offerer/offerer';

import { ILink } from '../link/link';
import { IMeta } from '../meta/meta';

export interface ITenderOfferer {
  data: ITenderOffererAttributes,
}

export interface ITenderOffererData {
  data: ITenderOffererAttributes[],
  meta?: IMeta | undefined,
  link?: ILink | undefined
}
export interface ITenderOffererAttributes {
  id: string | number;
  offerer_id: number | string;
  tender_id: number | string;
  status_id: string | number;
  offerers?: IOffererData;
}

