import { ComponentCompilerMeta } from '@stencil/core/internal';
import { dashToPascalCase } from '../dash-to-pascal-case/dash-to-pascal-case';

export const getGeneralComponentTypes = (cmp: ComponentCompilerMeta) => {
  const tagName = cmp.tagName.toLowerCase();
  const tagNameAsPascal = dashToPascalCase(tagName);
  const htmlElementName = `HTML${tagNameAsPascal}Element`;
  const customEventName = `${tagNameAsPascal}CustomEvent`;
  const htmlElementEventMapName = `${htmlElementName}EventMap`;

  return {
    tagName,
    tagNameAsPascal,
    htmlElementName,
    customEventName,
    htmlElementEventMapName,
  };
};
