import { stubBuildCtx, stubCompilerCtx, stubComponentCompilerEvent, stubComponentCompilerMeta } from '../../tests';
import { NormalizedOutputTargetStrictEventListeners } from '../../types';
import { generator } from './generator';
import { TABS } from '../../consts';

const mockGenerateComments = jest.fn();
jest.mock('../../generate/generate-comments', () => {
  return {
    generateComments: () => {
      return mockGenerateComments.mockImplementation(() => `/** stub comments */`)();
    },
  };
});

describe('generator', () => {
  it('should generate event listener global types for components with events', done => {
    const outputTarget: NormalizedOutputTargetStrictEventListeners = {
      excludeComponents: [],
      importPath: './components',
      outputPaths: ['src/component-event-listeners.d.ts'],
    };

    const components = [stubComponentCompilerMeta({ events: [stubComponentCompilerEvent()] })];

    const buildCtx = stubBuildCtx(components);

    const [directory, compilerCtx] = stubCompilerCtx();

    const expectedOutput = [
      '/** stub comments */',
      '',
      'import {',
      `${TABS[1]}StubCmpCustomEvent,`,
      `${TABS[1]}UserImplementedEventType,`,
      `} from './components';`,
      '',
      'interface HTMLStubCmpElementEventMap {',
      `${TABS[1]}"myEvent": UserImplementedEventType;`,
      '}',
      ``,
      'declare global {',
      `${TABS[1]}interface HTMLStubCmpElement {`,
      `${TABS[2]}addEventListener<K extends keyof HTMLStubCmpElementEventMap>(type: K, listener: (this: HTMLStubCmpElement, ev: StubCmpCustomEvent<HTMLStubCmpElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;`,
      `${TABS[2]}addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;`,
      `${TABS[2]}addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;`,
      `${TABS[2]}addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;`,
      `${TABS[2]}removeEventListener<K extends keyof HTMLStubCmpElementEventMap>(type: K, listener: (this: HTMLStubCmpElement, ev: StubCmpCustomEvent<HTMLStubCmpElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;`,
      `${TABS[2]}removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;`,
      `${TABS[2]}removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;`,
      `${TABS[2]}removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;`,
      `${TABS[1]}}`,
      '',
      `${TABS[1]}interface HTMLElementTagNameMap {`,
      `${TABS[2]}"stub-cmp": HTMLStubCmpElement;`,
      `${TABS[1]}}`,
      '}',
      '',
    ].join('\n');

    generator(outputTarget, compilerCtx, buildCtx).then(() => {
      expect(directory['src/component-event-listeners.d.ts']).toBe(expectedOutput);
      done();
    });
  });

  it('should not generate event listener global types for components that are excluded', done => {
    const outputTarget: NormalizedOutputTargetStrictEventListeners = {
      excludeComponents: ['first-cmp'],
      importPath: './components',
      outputPaths: ['src/component-event-listeners.d.ts'],
    };

    const components = [
      stubComponentCompilerMeta({ tagName: 'first-cmp', events: [stubComponentCompilerEvent()] }),
      stubComponentCompilerMeta({ tagName: 'second-cmp', events: [stubComponentCompilerEvent()] }),
    ];

    const buildCtx = stubBuildCtx(components);

    const [directory, compilerCtx] = stubCompilerCtx();

    const expectedOutput = [
      '/** stub comments */',
      '',
      'import {',
      `${TABS[1]}SecondCmpCustomEvent,`,
      `${TABS[1]}UserImplementedEventType,`,
      `} from './components';`,
      '',
      'interface HTMLSecondCmpElementEventMap {',
      `${TABS[1]}"myEvent": UserImplementedEventType;`,
      '}',
      ``,
      'declare global {',
      `${TABS[1]}interface HTMLSecondCmpElement {`,
      `${TABS[2]}addEventListener<K extends keyof HTMLSecondCmpElementEventMap>(type: K, listener: (this: HTMLSecondCmpElement, ev: SecondCmpCustomEvent<HTMLSecondCmpElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;`,
      `${TABS[2]}addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;`,
      `${TABS[2]}addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;`,
      `${TABS[2]}addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;`,
      `${TABS[2]}removeEventListener<K extends keyof HTMLSecondCmpElementEventMap>(type: K, listener: (this: HTMLSecondCmpElement, ev: SecondCmpCustomEvent<HTMLSecondCmpElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;`,
      `${TABS[2]}removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;`,
      `${TABS[2]}removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;`,
      `${TABS[2]}removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;`,
      `${TABS[1]}}`,
      '',
      `${TABS[1]}interface HTMLElementTagNameMap {`,
      `${TABS[2]}"second-cmp": HTMLSecondCmpElement;`,
      `${TABS[1]}}`,
      '}',
      '',
    ].join('\n');

    generator(outputTarget, compilerCtx, buildCtx).then(() => {
      expect(directory['src/component-event-listeners.d.ts']).toBe(expectedOutput);
      done();
    });
  });

  it('should not generate event listener global types for internal components', done => {
    const outputTarget: NormalizedOutputTargetStrictEventListeners = {
      excludeComponents: [],
      importPath: './components',
      outputPaths: ['src/component-event-listeners.d.ts'],
    };

    const components = [
      stubComponentCompilerMeta({ tagName: 'first-cmp', events: [stubComponentCompilerEvent()] }),
      stubComponentCompilerMeta({ internal: true, tagName: 'second-cmp', events: [stubComponentCompilerEvent()] }),
    ];

    const buildCtx = stubBuildCtx(components);

    const [directory, compilerCtx] = stubCompilerCtx();

    const expectedOutput = [
      '/** stub comments */',
      '',
      'import {',
      `${TABS[1]}FirstCmpCustomEvent,`,
      `${TABS[1]}UserImplementedEventType,`,
      `} from './components';`,
      '',
      'interface HTMLFirstCmpElementEventMap {',
      `${TABS[1]}"myEvent": UserImplementedEventType;`,
      '}',
      ``,
      'declare global {',
      `${TABS[1]}interface HTMLFirstCmpElement {`,
      `${TABS[2]}addEventListener<K extends keyof HTMLFirstCmpElementEventMap>(type: K, listener: (this: HTMLFirstCmpElement, ev: FirstCmpCustomEvent<HTMLFirstCmpElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;`,
      `${TABS[2]}addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;`,
      `${TABS[2]}addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;`,
      `${TABS[2]}addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;`,
      `${TABS[2]}removeEventListener<K extends keyof HTMLFirstCmpElementEventMap>(type: K, listener: (this: HTMLFirstCmpElement, ev: FirstCmpCustomEvent<HTMLFirstCmpElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;`,
      `${TABS[2]}removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;`,
      `${TABS[2]}removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;`,
      `${TABS[2]}removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;`,
      `${TABS[1]}}`,
      '',
      `${TABS[1]}interface HTMLElementTagNameMap {`,
      `${TABS[2]}"first-cmp": HTMLFirstCmpElement;`,
      `${TABS[1]}}`,
      '}',
      '',
    ].join('\n');

    generator(outputTarget, compilerCtx, buildCtx).then(() => {
      expect(directory['src/component-event-listeners.d.ts']).toBe(expectedOutput);
      done();
    });
  });
});
