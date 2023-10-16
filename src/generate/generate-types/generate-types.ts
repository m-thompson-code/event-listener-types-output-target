import { ComponentCompilerMeta } from "@stencil/core/internal";
import { generateGlobalType } from "../generate-global-type";
import { generateStencilEventTypeImport } from "../generate-stencil-event-type-import";
import { generateEventMaps } from "../generate-event-maps";
import { generateComments } from '../generate-comments';

export const generateTypes = (cmps: ComponentCompilerMeta[], importPath: string): string => {
    const comments = generateComments();

    if (!cmps.length) {
        return `${comments}\n`;
    }

    const imports = generateStencilEventTypeImport(cmps, importPath);
    const eventMaps = generateEventMaps(cmps);
    const globalTypes = generateGlobalType(cmps);
    
    return [
        comments,
        '',
        imports,
        '',
        eventMaps,
        '',
        globalTypes,
        '',
    ].join('\n');
};
