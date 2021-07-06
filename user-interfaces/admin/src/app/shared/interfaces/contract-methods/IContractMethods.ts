import { ILink } from "../link/link";
import { IMeta } from "../meta/meta";

export interface IContractMethod {
  data: IContractMethodAttributes[],
  meta: IMeta,
  links: ILink
}

export interface IContractMethodAttributes {
  id: string | number;
  code: string;
  method_name: string;
}
