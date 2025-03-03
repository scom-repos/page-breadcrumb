import {
  Module,
  customModule,
  Styles,
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
      ["i-scom-page-breadcrumb"]: ScomPageBreadcrumbElement;
    }
  }
}

@customModule
@customElements('i-scom-page-breadcrumb')
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
    const themeVar = document.body.style.getPropertyValue('--theme') || 'dark';
    this.updateStyle('--text-primary', this.model.tag[themeVar]?.color);
    this.updateStyle('--colors-primary-main', this.model.tag[themeVar]?.activeColor);
    this.updateStyle('--typography-font-size', this.model.tag?.fontSize);
    this.breadcrumb.tag = {...this.model.tag};
  }

  private handleItemClick(item: IBreadcrumbItem) {
    if (!item.data) return;
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