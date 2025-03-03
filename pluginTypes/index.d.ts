/// <amd-module name="@scom/page-breadcrumb/interface.ts" />
declare module "@scom/page-breadcrumb/interface.ts" {
    import { IBreadcrumbItem } from "@ijstech/components";
    export interface IConfig {
        data: IBreadcrumbItem[];
    }
    export interface ISettings {
        light?: IColors;
        dark?: IColors;
        fontSize?: string;
        gap?: string | number;
    }
    export interface IColors {
        color?: string;
        activeColor?: string;
    }
}
/// <amd-module name="@scom/page-breadcrumb/model/index.ts" />
declare module "@scom/page-breadcrumb/model/index.ts" {
    import { IBreadcrumbItem } from '@ijstech/components';
    import { IConfig, ISettings } from "@scom/page-breadcrumb/interface.ts";
    interface IOptions {
        onUpdateBlock: () => void;
        onUpdateTheme: () => void;
    }
    export class Model {
        private _data;
        private _tag;
        private _options;
        constructor(options: IOptions);
        get data(): IBreadcrumbItem[];
        set data(value: IBreadcrumbItem[]);
        get tag(): ISettings;
        set tag(value: ISettings);
        private getData;
        setData(data: IConfig): Promise<void>;
        private getTag;
        private setTag;
        private updateTag;
        getConfigurators(): ({
            name: string;
            target: string;
            getActions: () => any[];
            getData: any;
            setData: (data: IConfig) => Promise<void>;
            getTag: any;
            setTag: any;
            getLinkParams?: undefined;
            setLinkParams?: undefined;
        } | {
            name: string;
            target: string;
            getActions: () => any[];
            getLinkParams: () => {
                data: string;
            };
            setLinkParams: (params: any) => Promise<void>;
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
        })[];
    }
}
/// <amd-module name="@scom/page-breadcrumb" />
declare module "@scom/page-breadcrumb" {
    import { Module, ControlElement, Container, IBreadcrumbItem } from '@ijstech/components';
    import { IConfig } from "@scom/page-breadcrumb/interface.ts";
    interface ScomPageBreadcrumbElement extends ControlElement {
        lazyLoad?: boolean;
        data?: IBreadcrumbItem[];
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ["i-scom-page-breadcrumb"]: ScomPageBreadcrumbElement;
            }
        }
    }
    export default class ScomPageBreadcrumb extends Module {
        private breadcrumb;
        private model;
        static create(options?: ScomPageBreadcrumbElement, parent?: Container): Promise<ScomPageBreadcrumb>;
        constructor(parent?: Container, options?: ScomPageBreadcrumbElement);
        private setData;
        getConfigurators(): ({
            name: string;
            target: string;
            getActions: () => any[];
            getData: any;
            setData: (data: IConfig) => Promise<void>;
            getTag: any;
            setTag: any;
            getLinkParams?: undefined;
            setLinkParams?: undefined;
        } | {
            name: string;
            target: string;
            getActions: () => any[];
            getLinkParams: () => {
                data: string;
            };
            setLinkParams: (params: any) => Promise<void>;
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
        })[];
        private onUpdateBlock;
        private updateStyle;
        private onUpdateTheme;
        private handleItemClick;
        init(): void;
        render(): any;
    }
}
