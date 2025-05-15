import {
  Module,
  customModule,
  ControlElement,
  customElements,
  Container,
  Breadcrumb,
  IBreadcrumbItem
} from '@ijstech/components';
import { IConfig } from './interface';
import { Model } from './model/index';

interface ScomPageBreadcrumbElement extends ControlElement {
  lazyLoad?: boolean;
  data?: IBreadcrumbItem[];
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["i-page-breadcrumb"]: ScomPageBreadcrumbElement;
    }
  }
}

@customModule
@customElements('i-page-breadcrumb', {
  icon: 'stop',
  props: {
    data: {
      type: 'array',
      default: []
    }
  },
  className: 'ScomPageBreadcrumb',
  events: {},
  dataSchema: {
    "type": "array",
    "items": {
      "type": "object",
      "properties": {
        "caption": {
          "type": "string"
        },
        "data": {
          "type": "string",
          required: false
        }
      },
      "required": [
        "caption"
      ]
    }
  }
})
export default class ScomPageBreadcrumb extends Module {
  private breadcrumb: Breadcrumb;

  private model: Model;

  static async create(options?: ScomPageBreadcrumbElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  constructor(parent?: Container, options?: ScomPageBreadcrumbElement) {
    super(parent, options);
  }

  get data() {
    return this.model.data;
  }

  set data(value: IBreadcrumbItem[]) {
    this.model.data = value;
  }

  private async setData(data: IConfig) {
    this.model.setData(data);
  }

  getConfigurators() {
    return this.model.getConfigurators();
  }

  private onUpdateBlock() {
    this.breadcrumb.breadcrumbItems = this.model.data;
  }

  private updateStyle(name: string, value: any) {
    value ? this.style.setProperty(name, value) : this.style.removeProperty(name);
  }

  private onUpdateTheme() {
    this.updateStyle('--typography-font_size', this.model.tag?.font?.size);
    this.breadcrumb.tag = {...this.model.tag};
  }

  private handleItemClick(item: IBreadcrumbItem) {
    if (!item.data || this._designMode) return;
    window.open(item.data, '_self');
  }

  init() {
    super.init();
    this.handleItemClick = this.handleItemClick.bind(this);
    this.model = new Model({
      onUpdateBlock: this.onUpdateBlock.bind(this),
      onUpdateTheme: this.onUpdateTheme.bind(this)
    });
    const lazyLoad = this.getAttribute('lazyLoad', true, false);
    if (!lazyLoad) {
      const data = this.getAttribute('data', true);
      data && this.setData({ data });
    }
    const tag = this.getAttribute('tag', true);
    tag && this.model.setTag(tag);
  }

  render() {
    return (
      <i-panel>
        <i-breadcrumb
          id="breadcrumb"
          onItemClick={this.handleItemClick}
        />
      </i-panel>
    )
  }
}