import { TABS } from "../../consts";
import { getComponentTypes } from "../../utilities";
import { ComponentCompilerMeta } from "@stencil/core/internal";

export const generateHTMLElementTagNameMap = (cmps: ComponentCompilerMeta[]): string => {
    return [
        `${TABS[1]}interface HTMLElementTagNameMap {`,
        ...cmps.map(getComponentTypes).map(({ tagName, htmlElementName }) => `${TABS[2]}"${tagName}": ${htmlElementName};`),
        `${TABS[1]}}`,
    ].join("\n");
};
