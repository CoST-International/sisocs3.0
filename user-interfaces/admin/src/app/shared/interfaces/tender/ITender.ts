import { IContractTypeAttributes } from '../contract-type/IContractType';
import { ILink } from '../link/link';
import { IMeta } from '../meta/meta';
import { IProjectData } from '../project/IProject';
import { IStandardstatusAttributes } from '../standardstatus/IStandardstatus';
import { IStatusAttributes } from '../status/IStatus';
import { ITenderMethodAttributes } from '../tender-methods/ITenderMethod';

export interface ITender {
  data: ITenderAttributes,
}
export interface ITenderData {
  data: ITenderAttributes[],
  meta?: IMeta | undefined,
  link?: ILink | undefined
}
export interface ITenderAttributes {
  id: string | number;
  project_id: string | number;
  identifier?: number | string;
  process_number_standard: string;
  process_number: string;
  process_name: string;
  status_id: number | string;
  standard_status_id: number | string;
  bidding_start: string;
  bidding_end: string;
  contract_type_id: number | string;
  tender_method_id: number | string;
  ocds_id?: string;
  organization_id?: number | string;
  organization_unit_id?: number | string;
  project?: IProjectData,
  standardStatus?: IStandardstatusAttributes;
  status?: IStatusAttributes;
  tenderMethod?: ITenderMethodAttributes;
  contractType?: IContractTypeAttributes;
}

