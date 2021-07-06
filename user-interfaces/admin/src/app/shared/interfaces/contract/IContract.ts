import { IAward, IAwardAttributes } from '../award/IAward';

import { ILink } from '../link/link';
import { IMeta } from '../meta/meta';
import { IOfferer } from '../offerer/offerer';
import { IOrganization } from '../organization/IOrganization';
import { IProjectAttributes } from '../project/IProject';

export interface IContract {
  data: IContractAttributes
}

export interface IContractData {
  data: IContractAttributes[],
  meta: IMeta,
  links: ILink
}

export interface IContractAttributes {
  id: string | number;
  process_number_standard: string;
  contract_number: string;
  contract_title: string;
  contract_scope: string;
  price_local_currency?: number | string;
  price_usd_currency?: number | string;
  start_date: string;
  end_date: string;
  duration: string;
  award_id: number | string;
  organization_id: number | string;
  ocds_id: string;
  offerer_id: number | string;
  status_id: number | string;
  standard_status_id: number | string;
  user_creation?: number | string;
  project_id: number | string;
  organization?: IOrganization,
  offerer?: IOfferer,
  currency_id: number | string;
  award?: IAwardAttributes;
  project?: IProjectAttributes;
}
