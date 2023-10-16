import { ComponentCompilerMeta } from '@stencil/core/internal';
import { TABS } from '../../consts';
import { getComponentTypes, getImportedEventTypes } from '../../utilities';
import { removeDuplicates } from '../../utilities/remove-duplicates/remove-duplicates';

export const generateStencilEventTypeImport = (cmps: ComponentCompilerMeta[], importPath: string): string => {
  const imports = removeDuplicates(cmps.map(cmp => [getComponentTypes(cmp).customEventName, ...getImportedEventTypes(cmp)]).flat());
  return [`import {`, ...imports.map(type => `${TABS[1]}${type},`), `} from '${importPath}';`].join('\n');
};
