import { stubBuildCtx, stubCompilerCtx, stubComponentCompilerEvent, stubComponentCompilerMeta } from "../../tests";
import { NormalizedOutputTargetStrictEventListeners } from "../../types";
import { generator } from "./generator";
import { TABS } from "../../consts";

const mockGenerateComments = jest.fn();
jest.mock("../../generate/generate-comments", () => {

    return {
        generateComments: () => {
            return mockGenerateComments.mockImplementation(
                () => `/** stub comments */\n`,
            )();
        },
    };
});

describe('generator', () => {
    it('should generate basic global types for components without events', (done) => {
        const outputTarget: NormalizedOutputTargetStrictEventListeners = {
            excludeComponents: [],
            importPath: './components',
            outputPaths: ["src/component-event-listeners.d.ts", "dist/types/component-event-listeners.d.ts"],
        };

        const components = [
            stubComponentCompilerMeta(),
        ];

        const buildCtx = stubBuildCtx(components);

        const [directory, compilerCtx] = stubCompilerCtx();

        const expectedOutput = [
            '/** stub comments */',
            '',
            'declare global {',
            `${TABS[1]}interface HTMLStubCmpElement {`,
            `${TABS[1]}}`,
            '',
            `${TABS[1]}interface HTMLElementTagNameMap {`,
            `${TABS[2]}"stub-cmp": HTMLStubCmpElement;`,
            `${TABS[1]}}`,
            '}',
            '',
        ].join('\n');

        generator(outputTarget, compilerCtx, buildCtx).then(() => {
            expect(directory["src/component-event-listeners.d.ts"]).toBe(expectedOutput);
            expect(directory["dist/types/component-event-listeners.d.ts"]).toBe(expectedOutput);
            done();
        });
    });

    it('should generate event listener global types for components with events', (done) => {
        const outputTarget: NormalizedOutputTargetStrictEventListeners = {
            excludeComponents: [],
            importPath: './components',
            outputPaths: ["src/component-event-listeners.d.ts", "dist/types/component-event-listeners.d.ts"],
        };

        const components = [
            stubComponentCompilerMeta({ events: [stubComponentCompilerEvent()] }),
        ];

        const buildCtx = stubBuildCtx(components);

        const [directory, compilerCtx] = stubCompilerCtx();

        const expectedOutput = [
            '/** stub comments */',
            '',
            'import {',
            `${TABS[1]}StubCmpCustomEvent,`,
            `} from './components';`,
            '',
            'interface HTMLStubCmpElementEventMap {',
            `${TABS[1]}"myEvent": UserImplementedEventType;`,
            '}',
            ``,
            'declare global {',
            `${TABS[1]}interface HTMLStubCmpElement {`,
            `${TABS[2]}addEventListener<K extends keyof HTMLStubCmpElementEventMap>(type: K, listener: (this: HTMLStubCmpElement, ev: StubCmpCustomEvent<HTMLStubCmpElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;`,
            `${TABS[2]}addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;`,
            `${TABS[2]}removeEventListener<K extends keyof HTMLStubCmpElementEventMap>(type: K, listener: (this: HTMLStubCmpElement, ev: StubCmpCustomEvent<HTMLStubCmpElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;`,
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
            expect(directory["src/component-event-listeners.d.ts"]).toBe(expectedOutput);
            expect(directory["dist/types/component-event-listeners.d.ts"]).toBe(expectedOutput);
            done();
        });
    });

    it('should not generate event listener global types for components that are excluded', (done) => {
        const outputTarget: NormalizedOutputTargetStrictEventListeners = {
            excludeComponents: ['first-cmp'],
            importPath: './components',
            outputPaths: ["src/component-event-listeners.d.ts", "dist/types/component-event-listeners.d.ts"],
        };

        const components = [
            stubComponentCompilerMeta({ tagName: 'first-cmp', events: [stubComponentCompilerEvent()] }),
            stubComponentCompilerMeta({ tagName: 'second-cmp',events: [stubComponentCompilerEvent()] }),
        ];

        const buildCtx = stubBuildCtx(components);

        const [directory, compilerCtx] = stubCompilerCtx();

        const expectedOutput = [
            '/** stub comments */',
            '',
            'import {',
            `${TABS[1]}SecondCmpCustomEvent,`,
            `} from './components';`,
            '',
            'interface HTMLSecondCmpElementEventMap {',
            `${TABS[1]}"myEvent": UserImplementedEventType;`,
            '}',
            ``,
            'declare global {',
            `${TABS[1]}interface HTMLSecondCmpElement {`,
            `${TABS[2]}addEventListener<K extends keyof HTMLSecondCmpElementEventMap>(type: K, listener: (this: HTMLSecondCmpElement, ev: SecondCmpCustomEvent<HTMLSecondCmpElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;`,
            `${TABS[2]}addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;`,
            `${TABS[2]}removeEventListener<K extends keyof HTMLSecondCmpElementEventMap>(type: K, listener: (this: HTMLSecondCmpElement, ev: SecondCmpCustomEvent<HTMLSecondCmpElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;`,
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
            expect(directory["src/component-event-listeners.d.ts"]).toBe(expectedOutput);
            expect(directory["dist/types/component-event-listeners.d.ts"]).toBe(expectedOutput);
            done();
        });
    });
});

// TODO: internal