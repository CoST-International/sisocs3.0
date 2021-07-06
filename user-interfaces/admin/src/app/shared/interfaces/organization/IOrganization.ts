import { ILink } from "../link/link";
import { IMeta } from "../meta/meta";

export interface IOrganization {
  data: IOrganizationAttributes
}

export interface IOrganizationData {
  data: IOrganizationAttributes[],
  meta: IMeta,
  links: ILink
}

export interface IOrganizationAttributes {
  id: string | number,
  organization_name: string,
  organization_legal_name: string,
  identifier: number | string,
  code: string,
  description: string,
  address?: string,
  website: string,
  direction?: string,
  telephone?: string,
}
