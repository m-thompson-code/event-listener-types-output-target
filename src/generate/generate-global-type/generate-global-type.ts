import { ComponentCompilerMeta } from "@stencil/core/internal";
import { generateHTMLElementTagNameMap } from "../generate-html-element-tag-name-map";
import { generateHTMLElementType } from "../generate-html-element-type";

export const generateGlobalType = (cmps: ComponentCompilerMeta[]): string => {
    if (!cmps.length) {
        return '';
    }
    
    return [
        `declare global {`,
        ...cmps.map(cmp => `${generateHTMLElementType(cmp)}\n`),
        generateHTMLElementTagNameMap(cmps),
        `}`
    ].join("\n");
};
