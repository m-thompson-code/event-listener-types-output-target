import { ComponentCompilerMeta } from "@stencil/core/internal";
import { generateGlobalType } from "./generate-global-type";
import { getComponentTypes } from "../../utilities";
import { TABS } from "../../consts";
import { stubComponentCompilerMeta } from "../../tests";

const mockGenerateHTMLElementType_ = (cmp: ComponentCompilerMeta): string => {
    return [
        `${TABS[1]}interface ${getComponentTypes(cmp).htmlElementName} {`,
        `${TABS[2]}stubHTMLElementProp: StubHTMLElementPropType`,
        `${TABS[1]}}`,
    ].join("\n");
};

const mockGenerateHTMLElementType = jest.fn();
jest.mock("../generate-html-element-type", () => {
    return {
        generateHTMLElementType: (cmp: ComponentCompilerMeta) => {
            return mockGenerateHTMLElementType.mockImplementation((cmp: ComponentCompilerMeta) => mockGenerateHTMLElementType_(cmp))(
                cmp,
            );
        },
    };
});

describe("generateGlobalType", () => {
    it("should generate html element types for a component and add it to the HTMLElementTagNameMap in the declared global", () => {
        const components = [
            stubComponentCompilerMeta()
        ];
        expect(generateGlobalType(components)).toBe([
            `declare global {`,
            `${TABS[1]}interface HTMLStubCmpElement {`,
            `${TABS[2]}stubHTMLElementProp: StubHTMLElementPropType`,
            `${TABS[1]}}`,
            '',
            `${TABS[1]}interface HTMLElementTagNameMap {`,
            `${TABS[2]}"stub-cmp": HTMLStubCmpElement;`,
            `${TABS[1]}}`,
            '}'
        ].join('\n'));
    });

    it("should generate html element types for multiple components and add them to the HTMLElementTagNameMap in the declared global", () => {
        const components = [
            stubComponentCompilerMeta({ tagName: 'first-cmp' }),
            stubComponentCompilerMeta({ tagName: 'second-cmp' }),
        ];
        expect(generateGlobalType(components)).toBe([
            `declare global {`,
            `${TABS[1]}interface HTMLFirstCmpElement {`,
            `${TABS[2]}stubHTMLElementProp: StubHTMLElementPropType`,
            `${TABS[1]}}`,
            '',
            `${TABS[1]}interface HTMLSecondCmpElement {`,
            `${TABS[2]}stubHTMLElementProp: StubHTMLElementPropType`,
            `${TABS[1]}}`,
            '',
            `${TABS[1]}interface HTMLElementTagNameMap {`,
            `${TABS[2]}"first-cmp": HTMLFirstCmpElement;`,
            `${TABS[2]}"second-cmp": HTMLSecondCmpElement;`,
            `${TABS[1]}}`,
            '}'
        ].join('\n'));
    });

    it("should return an empty string for no components", () => {
        expect(generateGlobalType([])).toBe('');
    });
});
