import { IAward, IAwardAttributes } from '../award/IAward';

import { ILink } from '../link/link';
import { IMeta } from '../meta/meta';
import { IOfferer } from '../offerer/offerer';
import { IOrganization } from '../organization/IOrganization';

export interface IContact {
  data: IContactAttributes
}

export interface IContactData {
  data: IContactAttributes[],
  meta: IMeta,
  links: ILink
}

export interface IContactAttributes {
  id: string | number;
  contact_name: string;
  email: string;
  address: string;
  phone: string;
}
