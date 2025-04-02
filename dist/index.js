var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/page-breadcrumb/interface.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/page-breadcrumb/model/index.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Model = void 0;
    class Model {
        constructor(options) {
            this._data = {
                data: []
            };
            this._tag = {
                light: {},
                dark: {}
            };
            this._options = options;
        }
        get data() {
            return this._data.data || [];
        }
        set data(value) {
            this._data.data = value || [];
        }
        get tag() {
            return this._tag;
        }
        set tag(value) {
            this._tag = value;
        }
        getData() {
            return this._data;
        }
        async setData(data) {
            this._data = data;
            this._options?.onUpdateBlock();
        }
        getTag() {
            return this._tag;
        }
        setTag(value) {
            const newValue = value || {};
            for (let prop in newValue) {
                if (newValue.hasOwnProperty(prop)) {
                    if (prop === 'light' || prop === 'dark')
                        this.updateTag(prop, newValue[prop]);
                    else
                        this._tag[prop] = newValue[prop];
                }
            }
            this._options?.onUpdateTheme();
            this._options?.onUpdateBlock();
        }
        updateTag(type, value) {
            this._tag[type] = this._tag[type] || {};
            for (let prop in value) {
                if (value.hasOwnProperty(prop))
                    this._tag[type][prop] = value[prop];
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
                    setData: async (data) => {
                        await this.setData({ ...data });
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
                        };
                    },
                    setLinkParams: async (params) => {
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
            ];
        }
    }
    exports.Model = Model;
});
define("@scom/page-breadcrumb", ["require", "exports", "@ijstech/components", "@scom/page-breadcrumb/model/index.ts"], function (require, exports, components_1, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let ScomPageBreadcrumb = class ScomPageBreadcrumb extends components_1.Module {
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        constructor(parent, options) {
            super(parent, options);
        }
        async setData(data) {
            this.model.setData(data);
        }
        getConfigurators() {
            return this.model.getConfigurators();
        }
        onUpdateBlock() {
            this.breadcrumb.breadcrumbItems = this.model.data;
        }
        updateStyle(name, value) {
            value ? this.style.setProperty(name, value) : this.style.removeProperty(name);
        }
        onUpdateTheme() {
            // const themeVar = document.body.style.getPropertyValue('--theme') || 'dark';
            this.updateStyle('--text-primary', this.model.tag?.font?.color);
            this.updateStyle('--colors-primary-main', this.model.tag?.activeColor);
            this.updateStyle('--typography-font_size', this.model.tag?.font?.size);
            this.breadcrumb.tag = { ...this.model.tag };
        }
        handleItemClick(item) {
            if (!item.data || this._designMode)
                return;
            window.open(item.data, '_self');
        }
        init() {
            super.init();
            this.handleItemClick = this.handleItemClick.bind(this);
            this.model = new index_1.Model({
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
            return (this.$render("i-panel", null,
                this.$render("i-breadcrumb", { id: "breadcrumb", onItemClick: this.handleItemClick })));
        }
    };
    ScomPageBreadcrumb = __decorate([
        components_1.customModule,
        (0, components_1.customElements)('i-page-breadcrumb', {
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
                "type": "object",
                "properties": {
                    "data": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "caption": {
                                    "type": "string"
                                },
                                "data": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "caption"
                            ]
                        }
                    }
                }
            }
        })
    ], ScomPageBreadcrumb);
    exports.default = ScomPageBreadcrumb;
});
