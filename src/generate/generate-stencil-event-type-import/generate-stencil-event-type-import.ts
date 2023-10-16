import { ComponentCompilerMeta } from "@stencil/core/internal";
import { TABS } from "../../consts";
import { getComponentTypes } from "../../utilities";

export const generateStencilEventTypeImport = (cmps: ComponentCompilerMeta[], importPath: string): string => {
    const cmpsWithEvents = cmps.filter(cmp => cmp.events.length);

    if (!cmpsWithEvents.length) {
        return '';
    }
    
    return [
        `import {`,
        ...cmpsWithEvents.map(getComponentTypes).map(({ customEventName }) => `${TABS[1]}${customEventName},`),
        `} from '${importPath}';`,
    ].join("\n");
};
