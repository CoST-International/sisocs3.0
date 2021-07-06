import { ILink } from "../link/link";
import { IMeta } from "../meta/meta";
import { IOrganizationAttributes } from "../organization/IOrganization";
import { IRoleAttributes } from "../role/IRole";

export interface IUser {
  data: IUserAttributes
}

export interface IUserData {
  data: IUserAttributes[],
  meta: IMeta,
  links: ILink
}
export interface IUserAttributes {
  id?: string | number;
  name?: string;
  email?: string;
  password?: string;
  role_id?: number | string;
  role?: IRoleAttributes;
  organization_id?: number | string;
  organization?: IOrganizationAttributes;
}
