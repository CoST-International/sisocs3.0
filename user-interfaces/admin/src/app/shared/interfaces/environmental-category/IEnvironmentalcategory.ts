import { ILink } from "../link/link";
import { IMeta } from "../meta/meta";

export interface IEnvironmentalcategory {
  data: IEnvironmentalcategoryAttributes[],
  meta: IMeta,
  links: ILink
}

export interface IEnvironmentalcategoryAttributes {
  id: string | number;
  name: string;
}
