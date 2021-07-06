import { ILink } from "../link/link";
import { IMeta } from "../meta/meta";

export interface IDocumentType {
  data: IDocumentTypeAttributes[],
  meta: IMeta,
  links: ILink
}

export interface IDocumentTypeAttributes {
  id: string | number;
  type: string;
  type_local: string;
  sections_id: number | string;
}
