import { IDocumentTypeAttributes } from "../document-types/IDocumentType";
import { ILink } from "../link/link";
import { IMeta } from "../meta/meta";

export interface ISection {
  data: ISectionAttributes[],
  meta: IMeta,
  links: ILink
}

export interface ISectionAttributes {
  id: string | number;
  section: string;
  section_local: string;
  documentType: IDocumentTypeAttributes;
}
