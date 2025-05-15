import { IBreadcrumbItem, IFont } from "@ijstech/components";

export interface IConfig {
  data: IBreadcrumbItem[];
}

export interface ISettings {
  gap?: string|number;
  font?: IFont;
  activeColor?: string;
}
