import { TABS } from '../../consts';
import { getGeneralComponentTypes } from '../../utilities';
import { ComponentCompilerMeta } from '@stencil/core/internal';

export const generateHTMLElementTagNameMap = (cmps: ComponentCompilerMeta[]): string => {
  return [
    `${TABS[1]}interface HTMLElementTagNameMap {`,
    ...cmps.map(getGeneralComponentTypes).map(({ tagName, htmlElementName }) => `${TABS[2]}"${tagName}": ${htmlElementName};`),
    `${TABS[1]}}`,
  ].join('\n');
};
