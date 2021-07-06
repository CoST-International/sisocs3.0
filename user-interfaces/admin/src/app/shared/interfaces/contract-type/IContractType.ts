import { ILink } from '../link/link';
import { IMeta } from '../meta/meta';

export interface IContractType {
  data: IContractTypeAttributes
}

export interface IContractTypeData {
  data: IContractTypeAttributes[],
  meta: IMeta,
  links: ILink
}

export interface IContractTypeAttributes {
  id: string | number;
  code?: string;
  type_name?: string;
  type_local?: string;
}
