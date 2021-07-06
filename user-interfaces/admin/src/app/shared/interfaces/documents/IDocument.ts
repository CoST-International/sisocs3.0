import { IDocumentTypeAttributes } from "../document-types/IDocumentType";
import { ILink } from "../link/link";
import { IMeta } from "../meta/meta";
import { ISectionAttributes } from "../section/ISection";

export interface IDocument {
  data: IDocumentAttributes,
}

export interface IDocumentData {
  data: IDocumentAttributes[],
  meta: IMeta,
  links: ILink
}

export interface IDocumentAttributes {
  id: string | number;
  section_id: number | string;
  project_id: number | string;
  document_type_id: number | string;
  document_qualification: string;
  document_description: string,
  document: File,
  document_title: string;
  document_author: string;
  document_language: string;
  document_published: string;
  document_path: string;
  document_start: string;
  document_end: string;
  document_format: string;
  section: ISectionAttributes;
  documentType: IDocumentTypeAttributes;
}
