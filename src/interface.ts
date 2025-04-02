import { IBreadcrumbItem, IFont } from "@ijstech/components";

export interface IConfig {
  data: IBreadcrumbItem[];
}

export interface ISettings {
  light?: IColors;
  dark?: IColors;
  gap?: string|number;
  font?: IFont;
  activeColor?: string;
}

export interface IColors {
}