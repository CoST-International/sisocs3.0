import { ILink } from "../link/link";
import { IMeta } from "../meta/meta";
import { IOrganizationAttributes } from 'src/app/shared/interfaces/organization/IOrganization';

export interface IOrganizationunit {
  data: IOrganizationunitAttributes
}

export interface IOrganizationunitData {
  data: IOrganizationunitAttributes[],
  meta: IMeta,
  links: ILink
}

export interface IOrganizationunitAttributes {
  id: string | number;
  name: string;
  organization_id: string | number;
  organization?: IOrganizationAttributes
}
