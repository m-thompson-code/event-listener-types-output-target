import { TABS } from "../../consts";
import { stubComponentCompilerEvent, stubComponentCompilerMeta } from "../../tests";

import { generateEventListenerTypes } from "./generate-event-listener-types";

describe("generateEventListenerTypes", () => {
    it("should return empty arrays when no events are provided", () => {
        expect(generateEventListenerTypes(stubComponentCompilerMeta())).toStrictEqual({
            htmlElementEventMap: [],
            htmlElementEventListenerProperties: [],
        });
    });

    it("should return the correct event map type that contains each user implemented event type", () => {
        const componentMeta = stubComponentCompilerMeta({
            events: [stubComponentCompilerEvent()],
        });

        const expectedHtmlElementEventMap = ["interface HTMLStubCmpElementEventMap {", `${TABS[1]}"myEvent": UserImplementedEventType;`, "}"];

        const { htmlElementEventMap } = generateEventListenerTypes(componentMeta);

        expect(htmlElementEventMap).toEqual(expectedHtmlElementEventMap);
    });

    it("should return the correct event map type where keys are wrapped with quotes", () => {
        const expectedEventMapKey = "my-key-with-dashes";
        const componentEvent = stubComponentCompilerEvent({
            internal: true,
            name: expectedEventMapKey,
            method: expectedEventMapKey,
            complexType: {
                original: "UserImplementedEventType",
                resolved: "",
                references: {},
            },
        });

        const componentMeta = stubComponentCompilerMeta({
            events: [componentEvent],
        });

        const expectedHtmlElementEventMap = [
            "interface HTMLStubCmpElementEventMap {",
            `${TABS[1]}"${expectedEventMapKey}": UserImplementedEventType;`,
            "}",
        ];

        const { htmlElementEventMap } = generateEventListenerTypes(componentMeta);

        expect(htmlElementEventMap).toEqual(expectedHtmlElementEventMap);
    });

    it("should derive event listener properties from event map", () => {
        const componentMeta = stubComponentCompilerMeta({
            events: [stubComponentCompilerEvent()],
        });

        const expectedHtmlElementEventListenerProperties = [
            `${TABS[2]}addEventListener<K extends keyof HTMLStubCmpElementEventMap>(type: K, listener: (this: HTMLStubCmpElement, ev: StubCmpCustomEvent<HTMLStubCmpElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;`,
            `${TABS[2]}addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;`,
            `${TABS[2]}removeEventListener<K extends keyof HTMLStubCmpElementEventMap>(type: K, listener: (this: HTMLStubCmpElement, ev: StubCmpCustomEvent<HTMLStubCmpElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;`,
            `${TABS[2]}removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;`,
        ];

        const { htmlElementEventListenerProperties } = generateEventListenerTypes(componentMeta);

        expect(htmlElementEventListenerProperties).toEqual(expectedHtmlElementEventListenerProperties);
    });

    it("should return the correct event listener types for a single event", () => {
        const componentMeta = stubComponentCompilerMeta({
            events: [stubComponentCompilerEvent()],
        });

        const expectedEventListenerTypes = {
            htmlElementEventMap: ["interface HTMLStubCmpElementEventMap {", `${TABS[1]}"myEvent": UserImplementedEventType;`, "}"],
            htmlElementEventListenerProperties: [
                `${TABS[2]}addEventListener<K extends keyof HTMLStubCmpElementEventMap>(type: K, listener: (this: HTMLStubCmpElement, ev: StubCmpCustomEvent<HTMLStubCmpElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;`,
                `${TABS[2]}addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;`,
                `${TABS[2]}removeEventListener<K extends keyof HTMLStubCmpElementEventMap>(type: K, listener: (this: HTMLStubCmpElement, ev: StubCmpCustomEvent<HTMLStubCmpElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;`,
                `${TABS[2]}removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;`,
            ],
        };

        const actualEventListenerTypes = generateEventListenerTypes(componentMeta);

        expect(actualEventListenerTypes).toEqual(expectedEventListenerTypes);
    });

    it('should return the correct type info for multiple events', () => {
        const componentEvent1 = stubComponentCompilerEvent(stubComponentCompilerEvent());
        componentEvent1.complexType.original
        const componentEvent2 = stubComponentCompilerEvent({
          internal: true,
          name: 'anotherEvent',
          method: 'anotherEvent',
          complexType: {
            original: 'AnotherUserImplementedEventType',
            resolved: '',
            references: {},
          },
        });
        const componentMeta = stubComponentCompilerMeta({
          events: [componentEvent1, componentEvent2],
        });
  
        const expectedEventListenerTypes = {
          htmlElementEventMap: [
            'interface HTMLStubCmpElementEventMap {',
            `${TABS[1]}"myEvent": UserImplementedEventType;`,
            `${TABS[1]}"anotherEvent": AnotherUserImplementedEventType;`,
            '}',
          ],
          htmlElementEventListenerProperties: [
            `${TABS[2]}addEventListener<K extends keyof HTMLStubCmpElementEventMap>(type: K, listener: (this: HTMLStubCmpElement, ev: StubCmpCustomEvent<HTMLStubCmpElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;`,
            `${TABS[2]}addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;`,
            `${TABS[2]}removeEventListener<K extends keyof HTMLStubCmpElementEventMap>(type: K, listener: (this: HTMLStubCmpElement, ev: StubCmpCustomEvent<HTMLStubCmpElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;`,
            `${TABS[2]}removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;`,
          ],
        };
  
        const actualEventListenerTypes = generateEventListenerTypes(componentMeta);
  
        expect(actualEventListenerTypes).toEqual(expectedEventListenerTypes);
      });
  
      it('should skip any events with no original typing field', () => {
        const componentEvent1 = stubComponentCompilerEvent();
        const componentEvent2 = stubComponentCompilerEvent({
          complexType: {
            original: '',
            resolved: '',
            references: {},
          },
        });
        const componentMeta = stubComponentCompilerMeta({
          events: [componentEvent1, componentEvent2],
        });
  
        const expectedEventListenerTypes = {
          htmlElementEventMap: [
            'interface HTMLStubCmpElementEventMap {',
            `${TABS[1]}"myEvent": UserImplementedEventType;`,
            '}',
          ],
          htmlElementEventListenerProperties: [
            `${TABS[2]}addEventListener<K extends keyof HTMLStubCmpElementEventMap>(type: K, listener: (this: HTMLStubCmpElement, ev: StubCmpCustomEvent<HTMLStubCmpElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;`,
            `${TABS[2]}addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;`,
            `${TABS[2]}removeEventListener<K extends keyof HTMLStubCmpElementEventMap>(type: K, listener: (this: HTMLStubCmpElement, ev: StubCmpCustomEvent<HTMLStubCmpElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;`,
            `${TABS[2]}removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;`,
          ],
        };
  
        const actualEventListenerTypes = generateEventListenerTypes(componentMeta);
  
        expect(actualEventListenerTypes).toEqual(expectedEventListenerTypes);
      });
  
      it('should return empty arrays when all events have no original typing field', () => {
        const componentEvent1 = stubComponentCompilerEvent({
          complexType: {
            original: '',
            resolved: '',
            references: {},
          },
        });
        const componentEvent2 = stubComponentCompilerEvent({
          complexType: {
            original: '',
            resolved: '',
            references: {},
          },
        });
        const componentMeta = stubComponentCompilerMeta({
          events: [componentEvent1, componentEvent2],
        });
  
        const expectedEventListenerTypes: ReturnType<typeof generateEventListenerTypes> = {
          htmlElementEventMap: [],
          htmlElementEventListenerProperties: [],
        };
  
        expect(generateEventListenerTypes(componentMeta)).toEqual(expectedEventListenerTypes);
      });
});
