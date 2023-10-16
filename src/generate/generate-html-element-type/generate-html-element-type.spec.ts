import { generateHTMLElementType } from './generate-html-element-type';
import { stubComponentCompilerEvent, stubComponentCompilerMeta } from '../../tests';
import { TABS } from '../../consts';

describe('generateHTMLElementType', () => {
  it('should generate HTML element types for a component if the component has events', () => {
    const component = stubComponentCompilerMeta({ events: [stubComponentCompilerEvent()] });
    expect(component.events.length).toBe(1);
    expect(generateHTMLElementType(component)).toBe(
      [
        `${TABS[1]}interface HTMLStubCmpElement {`,
        `${TABS[2]}addEventListener<K extends keyof HTMLStubCmpElementEventMap>(type: K, listener: (this: HTMLStubCmpElement, ev: StubCmpCustomEvent<HTMLStubCmpElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;`,
        `${TABS[2]}addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;`,
        `${TABS[2]}removeEventListener<K extends keyof HTMLStubCmpElementEventMap>(type: K, listener: (this: HTMLStubCmpElement, ev: StubCmpCustomEvent<HTMLStubCmpElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;`,
        `${TABS[2]}removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;`,
        `${TABS[1]}}`,
      ].join('\n'),
    );
  });

  it('should generate HTML element types that exclude event listeners if component does not have events', () => {
    const component = stubComponentCompilerMeta({ tagName: 'single-cmp' });
    expect(component.events.length).toBe(0);
    expect(generateHTMLElementType(component)).toBe([`${TABS[1]}interface HTMLSingleCmpElement {`, `${TABS[1]}}`].join('\n'));
  });
});
