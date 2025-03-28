import { IBreadcrumbItem } from '@ijstech/components';
import { IConfig, ISettings } from '../interface';

interface IOptions {
  onUpdateBlock: () => void;
  onUpdateTheme: () => void;
}

export class Model {
  private _data: IConfig = {
    data: []
  };
  private _tag: ISettings = {
    light: {},
    dark: {}
  };
  private _options: IOptions;

  constructor(options: IOptions) {
    this._options = options;
  }

  get data() {
    return this._data.data || [];
  }

  set data(value: IBreadcrumbItem[]) {
    this._data.data = value || [];
  }

  get tag() {
    return this._tag;
  }

  set tag(value: ISettings) {
    this._tag = value;
  }

  private getData() {
    return this._data
  }

  async setData(data: IConfig) {
    this._data = data
    this._options?.onUpdateBlock()
  }

  private getTag() {
    return this._tag
  }

  setTag(value: ISettings) {
    const newValue = value || {};
    for (let prop in newValue) {
      if (newValue.hasOwnProperty(prop)) {
        if (prop === 'light' || prop === 'dark') this.updateTag(prop, newValue[prop]);
        else this._tag[prop] = newValue[prop];
      }
    }

    this._options?.onUpdateTheme();
    this._options?.onUpdateBlock();
  }

  private updateTag(type: 'light' | 'dark', value: any) {
    this._tag[type] = this._tag[type] || {};
    for (let prop in value) {
      if (value.hasOwnProperty(prop)) this._tag[type][prop] = value[prop];
    }
  }

  getConfigurators() {
    const self = this;
    return [
      {
        name: 'Builder Configurator',
        target: 'Builders',
        getActions: () => [],
        getData: this.getData.bind(this),
        setData: async (data: IConfig) => {
          await this.setData({ ...data })
        },
        getTag: this.getTag.bind(this),
        setTag: this.setTag.bind(this)
      },
      {
        name: 'Emdedder Configurator',
        target: 'Embedders',
        getActions: () => [],
        getLinkParams: () => {
          const data = this._data || {};
          return {
            data: window.btoa(JSON.stringify(data))
          }
        },
        setLinkParams: async (params: any) => {
          if (params.data) {
            const utf8String = decodeURIComponent(params.data);
            const decodedString = window.atob(utf8String);
            const newData = JSON.parse(decodedString);
            let resultingData = {
              ...self._data,
              ...newData
            };
            await this.setData(resultingData);
          }
        },
        getData: this.getData.bind(this),
        setData: this.setData.bind(this),
        getTag: this.getTag.bind(this),
        setTag: this.setTag.bind(this)
      }
    ]
  }
}