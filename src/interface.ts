import { IBreadcrumbItem } from "@ijstech/components";

export interface IConfig {
  data: IBreadcrumbItem[];
}

export interface ISettings {
  light?: IColors;
  dark?: IColors;
  fontSize?: string;
  gap?: string|number;
}

export interface IColors {
  color?: string;
  activeColor?: string;
}