import { Module, customModule, Container } from '@ijstech/components';
import ScomPageBreadcrumb from '@scom/page-breadcrumb';

@customModule
export default class Module1 extends Module {
    private pnlButtons: ScomPageBreadcrumb;

    constructor(parent?: Container, options?: any) {
        super(parent, options);
    }

    async init() {
        super.init();
        const config = this.pnlButtons.getConfigurators()[0];
        if (config?.setTag) config.setTag({
            fontSize: '1rem',
            gap: 8,
            light: {
                color: 'black',
                activeColor: 'blue'
            },
            dark: {
                color: 'black',
                activeColor: 'blue'
            }
        })
    }

    render() {
        return <i-panel margin={{left: '1rem', top: '1rem'}}>
            <i-scom-page-breadcrumb
                id="pnlButtons"
                data={[
                    {
                      "caption": "Home",
                      "data": "https://www.ijs.network/"
                    },
                    {
                      "caption": "About Us",
                      "data": "https://www.ijs.network/about-us"
                    }
                ]}
            />
        </i-panel>
    }
}