import { ComponentCompilerMeta } from "@stencil/core/internal";
import { generateEventMaps } from "./generate-event-maps";
import { dashToPascalCase } from "../../utilities";
import { stubComponentCompilerEvent, stubComponentCompilerMeta } from "../../tests";
import { TABS } from "../../consts";

const mockHTMLElementEventMap = (cmp: ComponentCompilerMeta) => {
    const tagName = cmp.tagName.toLowerCase();
    const mockTagNameAsPascal = dashToPascalCase(tagName);
    const htmlElementName = `HTML${mockTagNameAsPascal}Element`;
    const htmlElementEventMapName = `${htmlElementName}EventMap`;

    return [`interface ${htmlElementEventMapName} {`, `${TABS[1]}stubEvent: StubEvent`, `}`];
}

const mockGenerateEventListenerTypes = jest.fn();
jest.mock("../generate-event-listener-types", () => {
    return {
        generateEventListenerTypes: (cmp: ComponentCompilerMeta) => {
            return mockGenerateEventListenerTypes.mockImplementation((cmp: ComponentCompilerMeta) => ({
                htmlElementEventMap: mockHTMLElementEventMap(cmp),
            }))(cmp);
        },
    };
});

describe("generateEventMaps", () => {
    it("should generate a event map for a single component", () => {
        expect(generateEventMaps([
            stubComponentCompilerMeta({ events: [stubComponentCompilerEvent() ]})
        ])).toBe([
            'interface HTMLStubCmpElementEventMap {',
            `${TABS[1]}stubEvent: StubEvent`,
            "}"
        ].join('\n'));
    });

    it("should generate each event map per component", () => {
        expect(generateEventMaps([
            stubComponentCompilerMeta({tagName: 'first-cmp', events: [stubComponentCompilerEvent()] }),
            stubComponentCompilerMeta({tagName: 'second-cmp', events: [stubComponentCompilerEvent()] }),
            stubComponentCompilerMeta({tagName: 'third-cmp', events: [stubComponentCompilerEvent()] }),
        ])).toBe([
            'interface HTMLFirstCmpElementEventMap {',
            `${TABS[1]}stubEvent: StubEvent`,
            "}",
            "",
            'interface HTMLSecondCmpElementEventMap {',
            `${TABS[1]}stubEvent: StubEvent`,
            "}",
            "",
            'interface HTMLThirdCmpElementEventMap {',
            `${TABS[1]}stubEvent: StubEvent`,
            "}"
        ].join('\n'));
    });
});
