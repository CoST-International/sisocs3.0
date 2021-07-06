import { ILink } from '../link/link';
import { IMeta } from '../meta/meta';

export interface IAdvance {
  data: IAdvanceAttributes,
}
export interface IAdvanceData {
  data: IAdvanceAttributes[],
  meta?: IMeta | undefined,
  link?: ILink | undefined
}
export interface IAdvanceAttributes {
  id: string | number;
  track_award?: string;
  track_tender?: string;
  identifier?: string;
  description: string;
  problem_description: string;
  payment: number;
  advance_date: string;
  currency_id: number | string;
  status_id?: number | string;
  standard_status_id?: number | string;
  contract_id: number | string;
  project_id: number | string;
  ocds_id?: string;
}

