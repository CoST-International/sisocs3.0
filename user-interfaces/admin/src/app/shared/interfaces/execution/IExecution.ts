import { ILink } from '../link/link';
import { IMeta } from '../meta/meta';
import { IProjectAttributes } from 'src/app/shared/interfaces/project/IProject';

export interface IExecution {
  data: IExecutionAttributes,
}
export interface IExecutionData {
  data: IExecutionAttributes[],
  meta?: IMeta | undefined,
  link?: ILink | undefined
}
export interface IExecutionAttributes {
  id: string | number;
  track_award?: string;
  track_tender?: string;
  var_time?: number | string;
  var_price?: number | string;
  start_date?: string;
  program?: string;
  contract_id?: number | string;
  contact_id?: number | string;
  status_id: number;
  publication_date?: string;
  ocds_id?: string;
  ocds?: string;
}

