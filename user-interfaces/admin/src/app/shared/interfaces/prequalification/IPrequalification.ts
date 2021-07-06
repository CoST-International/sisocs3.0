import { ILink } from '../link/link';
import { IMeta } from '../meta/meta';
import { IProjectData } from 'src/app/shared/interfaces/project/IProject';
import { IStandardstatusAttributes } from '../standardstatus/IStandardstatus';
import { IStatusAttributes } from '../status/IStatus';

export interface IPrequalification {
  data: IPrequalificationAttributes,
}
export interface IPrequalificationData {
  data: IPrequalificationAttributes[],
  meta?: IMeta | undefined,
  link?: ILink | undefined
}
export interface IPrequalificationAttributes {
  id: string | number;
  project_id: string | number;
  process_number_standard: string;
  process_number: string;
  date_start: string;
  status_id: number | string;
  standard_status_id: number | string;
  date_end: string;
  published_at?: string;
  project?: IProjectData,
  standardStatus?: IStandardstatusAttributes;
  status?: IStatusAttributes;
}

