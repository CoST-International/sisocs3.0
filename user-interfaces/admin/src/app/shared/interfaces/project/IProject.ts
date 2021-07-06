import { IDocumentAttributes, IDocumentData } from 'src/app/shared/interfaces/documents/IDocument';
import { IOc4idsSector, IOc4idsSectorAttributes } from '../oc4ids-sector/IOc4idssector';
import { IOfficial, IOfficialAttributes } from '../official/IOfficial';
import { IOrganization, IOrganizationAttributes } from '../organization/IOrganization';
import { IOrganizationunit, IOrganizationunitAttributes } from '../organization-unit/IOrganizationunit';
import { IPurpose, IPurposeAttributes } from '../Purpose/IPurpose';
import { ISector, ISectorAttributes } from '../sector/ISector';
import { IStandardstatus, IStandardstatusAttributes } from 'src/app/shared/interfaces/standardstatus/IStandardstatus';
import { IStatus, IStatusAttributes } from '../status/IStatus';

import { IAwardAttributes } from '../award/IAward';
import { ILink } from '../link/link';
import { IMeta } from '../meta/meta';
import { ISubsectorAttributes } from '../subsector/ISubsector';
import { ITenderAttributes } from '../tender/ITender';

export interface IProject {
  data: IProjectAttributes
}

export interface IProjectData {
  data: IProjectAttributes[],
  meta: IMeta,
  links: ILink
}

export interface IProjectAttributes {
  id: string | number;
  identifier?: number | string;
  track_code?: string;
  section_id?: number | string;
  process_number_standard?: string,
  project_code?: string;
  project_name?: string;
  project_description?: string;
  project_code_sefin?: string;
  project_budget?: number;
  project_budget_approved?: string;
  project_scope?: string;
  encironment_effect_description?: string;
  resettlement_description?: string;
  inital_lat?: string;
  inital_lon?: string;
  final_lon?: string;
  file_works_plan?: string;
  file_budget_multianual_program?: string;
  file_feasibility_study?: string;
  file_environment_effect_study?: string;
  file_environment_license_migration_contract?: string;
  file_resettlement_compesation_plan?: string;
  file_financing_agreement?: string;
  file_approval_description?: string;
  file_others?: string;
  organization_id?: number | string;
  organization_unit_id?: number | string;
  sector_id ?: number | string;
  subsector_id?: number | string;
  purpose_id?: number | string;
  official_id?: number | string;
  role_id?: number | string;
  standard_status_id?: number | string;
  status_id?: number | string;
  ocds_generation?: string;
  version?: string;
  user_creation?: string;
  user_publication?: string;
  published_at?: Date
  startDate?: Date
  endDate?: Date;
  durationInDays?: number;
  sector?: ISectorAttributes;
  oc4idsSector?: IOc4idsSectorAttributes;
  subSector?: ISubsectorAttributes;
  organization?: IOrganizationAttributes;
  organizationUnit?: IOrganizationunitAttributes;
  purpose?: IPurposeAttributes;
  official?: IOfficialAttributes;
  standardStatus?: IStandardstatusAttributes;
  status?: IStatusAttributes;
  tender?: ITenderAttributes;
  award?: IAwardAttributes;
  documents?: IDocumentData;
}
