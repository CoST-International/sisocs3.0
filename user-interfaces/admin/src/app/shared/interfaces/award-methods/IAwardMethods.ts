import { ILink } from "../link/link";
import { IMeta } from "../meta/meta";

export interface IAwardMethod {
  data: IAwardMethodAttributes,
}
export interface IAwardMethodData {
  data: IAwardMethodAttributes[],
  meta?: IMeta | undefined,
  link?: ILink | undefined
}

export interface IAwardMethodAttributes {
  id: string | number;
  code: string;
  method_name: string;
  method_local: string;
}
