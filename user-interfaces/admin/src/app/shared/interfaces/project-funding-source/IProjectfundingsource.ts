import { ILink } from "../link/link";
import { IMeta } from "../meta/meta";
import { IFundingsource } from 'src/app/shared/interfaces/funding-source/IFundingsource';
import { ICurrency } from 'src/app/shared/interfaces/currency/ICurrency';
import { IStandardstatus } from '../standardstatus/IStandardstatus';
import { IStandardstatusAttributes } from 'src/app/shared/interfaces/standardstatus/IStandardstatus';

export interface IProjectFundingSource {
  data: IProjectFundingSourceAttributes[],
  meta: IMeta,
  links: ILink
}

export interface IProjectFundingSourceAttributes {
  id: string | number;
  track_project?: string,
  amount: number | string,
  exchange_rate?: number,
  project_id: number | string,
  funding_source_id: number | string,
  currency_id: number | string,
  status_id?: number | string,
  fundingSources?: IFundingsource,
  currencies?: ICurrency,
  status?: IStandardstatusAttributes

}
