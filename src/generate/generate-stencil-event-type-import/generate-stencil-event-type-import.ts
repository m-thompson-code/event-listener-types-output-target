import { ComponentCompilerMeta } from "@stencil/core/internal";
import { TABS } from "../../consts";
import { getComponentTypes } from "../../utilities";

export const generateStencilEventTypeImport = (cmps: ComponentCompilerMeta[], importPath: string): string => {
    return [
        `import {`,
        ...cmps.map(getComponentTypes).map(({ customEventName }) => `${TABS[1]}${customEventName},`),
        `} from '${importPath}';`,
    ].join("\n");
};
