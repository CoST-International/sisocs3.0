import { IOrganizationunitAttributes, IOrganizationunitData } from 'src/app/shared/interfaces/organization-unit/IOrganizationunit';

import { ICurrencyAttributes } from '../currency/ICurrency';
import { IDocumentData } from 'src/app/shared/interfaces/documents/IDocument';
import { IEnvironmentalcategoryAttributes } from '../environmental-category/IEnvironmentalcategory';
import { ILink } from '../link/link';
import { IMeta } from '../meta/meta';
import { IProjectData } from '../project/IProject';
import { IStandardstatusAttributes } from '../standardstatus/IStandardstatus';
import { IStatusAttributes } from '../status/IStatus';

export interface IPreparation {
  data: IPreparationAttributes;
}

export interface IPreparationData {
  data: IPreparationAttributes[],
  meta: IMeta,
  links: ILink
}
export interface IPreparationAttributes {
  id: string | number;
  project_id: string | number;
  officcial_id?: string | number,
  status_id?: string | number;
  process_number_standard?: string;
  project_scope?: string;
  project_budget?: string;
  project_budget_approval_date?: string;
  organization_unit_id?: string | number;
  impact_environment_description?: string | number;
  land_resettlement_impact?: string;
  currency_id?: string | number;
  environmental_category_id?: string | number;
  standard_status_id?: string | number;
  start_date?: string | Date;
  end_date?: string | Date;
  documents?: IDocumentData;
  organizationUnit?: IOrganizationunitAttributes;
  currency?: ICurrencyAttributes;
  environmentCategory?: IEnvironmentalcategoryAttributes;
  project?: IProjectData;
  standardStatus?: IStandardstatusAttributes;
  status?: IStatusAttributes;
}

