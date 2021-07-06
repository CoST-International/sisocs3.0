import { IContract } from '../contract/IContract';
import { IContractAttributes } from 'src/app/shared/interfaces/contract/IContract';
import { ILink } from '../link/link';
import { IMeta } from '../meta/meta';
import { IStatus } from '../status/IStatus';

export interface IAddendum {
  data: IAddendumAttributes,
}
export interface IAddendumData {
  data: IAddendumAttributes[],
  meta?: IMeta | undefined,
  link?: ILink | undefined
}
export interface IAddendumAttributes {
  id: string | number;
  modify?: number | string;
  modification_type: string;
  description?: string;
  justification: string;
  contract_price: number;
  currency_id: number | string;
  current_contract_scope: string;
  addendum?: string;
  date: string;
  contract_date: string;
  contract_id: number | string;
  status_id : number | string;
  user_creation?: number | string;
  published_at?: string;
  contract?: IContractAttributes;
  status?: IStatus;
}

