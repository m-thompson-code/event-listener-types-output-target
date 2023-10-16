import { ComponentCompilerMeta } from '@stencil/core/internal';
import { generateEventListenerTypes } from '../generate-event-listener-types';

export const generateEventMaps = (cmps: ComponentCompilerMeta[]): string => {
  return cmps.map(cmp => generateEventListenerTypes(cmp).htmlElementEventMap.join('\n')).join('\n\n');
};
