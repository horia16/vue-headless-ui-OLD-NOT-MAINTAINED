import {App, Plugin} from "vue";
// Import vue components
import * as components from "@/lib-components/index";

const install: Exclude<Plugin["install"], undefined> = function installVueHeadlessUi(app: App) {
    Object.entries(components).forEach(([componentName, component]) => {
        app.component(componentName, component);
    });
};

export default install;

export * from "@/utils" ;
export * from "@/lib-components/index";
export * from "vee-validate";
