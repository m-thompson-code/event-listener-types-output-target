import { ComponentCompilerEvent, ComponentCompilerMeta } from '@stencil/core/internal';
import { TABS } from '../../consts';
import { dashToPascalCase } from '../../utilities';

/**
 * Generates event listener properties for the component's html element type. This is used to allow implementers
 * to use strict typings when adding and removing event listeners.
 *
 * @param cmp The component compiler metadata
 * @returns additional types information to add event listener method overloads for component's html element type
 */
export const generateEventListenerTypes = (
  cmp: ComponentCompilerMeta,
): { htmlElementEventMap: string[]; htmlElementEventListenerProperties: string[] } => {
  const tagName = cmp.tagName.toLowerCase();
  const tagNameAsPascal = dashToPascalCase(tagName);
  const htmlElementName = `HTML${tagNameAsPascal}Element`;
  const cmpEventInterface = `${tagNameAsPascal}CustomEvent`;
  const htmlElementEventMapName = `${htmlElementName}EventMap`;
  const cmpEvents = cmp.events.filter((cmpEvent) => cmpEvent.complexType.original);
  if (!cmpEvents.length) {
    return { htmlElementEventMap: [], htmlElementEventListenerProperties: [] };
  }
  return {
    htmlElementEventMap: getHtmlElementEventMap(cmpEvents, htmlElementEventMapName),
    htmlElementEventListenerProperties: [
      `${TABS[2]}addEventListener<K extends keyof ${htmlElementEventMapName}>(type: K, listener: (this: ${htmlElementName}, ev: ${cmpEventInterface}<${htmlElementEventMapName}[K]>) => any, options?: boolean | AddEventListenerOptions): void;`,
      `${TABS[2]}addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;`,
      `${TABS[2]}removeEventListener<K extends keyof ${htmlElementEventMapName}>(type: K, listener: (this: ${htmlElementName}, ev: ${cmpEventInterface}<${htmlElementEventMapName}[K]>) => any, options?: boolean | EventListenerOptions): void;`,
      `${TABS[2]}removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;`,
    ],
  };
};

/**
 * Generates map of event names and user user implemented event type(s). Used to avoid having to write individual
 * event listener method overloads per event type.
 *
 * @param cmpEvents a collection of the compiler metadata for a each individual `@Event()`
 * @param typeImportData locally/imported/globally used type names, which may be used to prevent naming collisions
 * @param sourceFilePath the path to the source file being visited
 * @param htmlElementEventMapName the name of the component event map type
 * @returns map of event names and user user implemented event type(s)
 */
const getHtmlElementEventMap = (
  cmpEvents: ComponentCompilerEvent[],
  htmlElementEventMapName: string,
): string[] => {
  const eventMapProperties = cmpEvents.map((cmpEvent) => {
    return `${TABS[1]}"${cmpEvent.name}": ${cmpEvent.complexType.original};`;
  });
  return [`interface ${htmlElementEventMapName} {`, ...eventMapProperties, `}`];
};
