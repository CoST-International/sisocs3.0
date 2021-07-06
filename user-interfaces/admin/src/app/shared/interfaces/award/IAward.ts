import { ILink } from '../link/link';
import { IMeta } from '../meta/meta';
import { IProjectAttributes } from 'src/app/shared/interfaces/project/IProject';

export interface IAward {
  data: IAwardAttributes,
}
export interface IAwardData {
  data: IAwardAttributes[],
  meta?: IMeta | undefined,
  link?: ILink | undefined
}
export interface IAwardAttributes {
  id: string | number;
  track_award?: string;
  track_tender?: string;
  identifier?: string;
  process_number_standard: string;
  process_number: string;
  contract_estimated_cost: number | string;
  tender_id: number | string;
  award_method_id: number | string;
  currency_id: number | string;
  // contract_method_id: number | string;
  status_id: number | string;
  standard_status_id: number | string;
  project_id: number | string;
  award_start: string;
  award_end:  string;
  ocds_id?: string;
  project?: IProjectAttributes;
}

