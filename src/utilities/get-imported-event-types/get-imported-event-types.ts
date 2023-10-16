import { ComponentCompilerMeta } from '@stencil/core/internal';
import { removeDuplicates } from '../remove-duplicates/remove-duplicates';

export const getImportedEventTypes = (cmp: ComponentCompilerMeta): string[] => {
  return removeDuplicates(
    cmp.events
      .map(event =>
        Object.entries(event.complexType.references)
          .filter(([, typeReference]) => typeReference.location === 'import')
          .map(([type]) => type),
      )
      .flat(),
  );
};
