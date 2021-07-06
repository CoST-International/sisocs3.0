import { ILink } from "../link/link";
import { IMeta } from "../meta/meta";
import { IOrganization } from 'src/app/shared/interfaces/organization/IOrganization';
import { IOrganizationunit } from 'src/app/shared/interfaces/organization-unit/IOrganizationunit';

export interface IOfficial {
  data: IOfficialAttributes
}

export interface IOfficialData {
  data: IOfficialAttributes[],
  meta: IMeta,
  links: ILink
}

export interface IOfficialAttributes {
  id: string | number;
  official_name: string;
  position: string;
  email: string;
  phone: string;
  organization_id?: number | string;
  organization_unit_id?: number | string;
  organization?: IOrganization,
  organizationUnit?: IOrganizationunit,
}
