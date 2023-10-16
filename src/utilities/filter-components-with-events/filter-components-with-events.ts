import { ComponentCompilerMeta } from "@stencil/core/internal";

export const filterComponentsWithEvents = (cmps: ComponentCompilerMeta[]) => {
    return cmps.filter(cmp => cmp.events.length)
};
