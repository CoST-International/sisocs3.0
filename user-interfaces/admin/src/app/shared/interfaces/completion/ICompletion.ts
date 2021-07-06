import { ILink } from '../link/link';
import { IMeta } from '../meta/meta';
import { IProjectAttributes } from 'src/app/shared/interfaces/project/IProject';

export interface ICompletion {
  data: ICompletionAttributes
}

export interface ICompletionData {
  data: ICompletionAttributes[],
  meta: IMeta,
  links: ILink
}

export interface ICompletionAttributes {
  id: string | number;
  project_id?: number | string;
  standard_status_id?: number | string;
  status_id?: number | string;
  process_number_standard?: string;
  final_scope?: string;
  date?: string;
  from?: string;
  to?: string;
  description?: string;
  change_specifications?: string;
  justification?: string;
  final_cost?: string;
  project?: IProjectAttributes;
  ocds_id?: string;
}
