import { stubComponentCompilerMeta } from "../../tests";
import { generateHTMLElementTagNameMap } from "./generate-html-element-tag-name-map";
import { TABS } from "../../consts";

describe('generateHTMLElementTagNameMap', () => {
    it('should generate an HTMLElementTagNameMap interface for a component', () => {
        const components = [stubComponentCompilerMeta()];
        expect(generateHTMLElementTagNameMap(components)).toBe([
            `${TABS[1]}interface HTMLElementTagNameMap {`,
            `${TABS[2]}"stub-cmp": HTMLStubCmpElement;`,
            `${TABS[1]}}`,
        ].join('\n'));
    });

    it('should generate an HTMLElementTagNameMap interface for multiple components', () => {
        const components = [
            stubComponentCompilerMeta({ tagName: 'first-cmp' }),
            stubComponentCompilerMeta({ tagName: 'second-cmp' }),
            stubComponentCompilerMeta({ tagName: 'third-cmp' }),
        ];
        expect(generateHTMLElementTagNameMap(components)).toBe([
            `${TABS[1]}interface HTMLElementTagNameMap {`,
            `${TABS[2]}"first-cmp": HTMLFirstCmpElement;`,
            `${TABS[2]}"second-cmp": HTMLSecondCmpElement;`,
            `${TABS[2]}"third-cmp": HTMLThirdCmpElement;`,
            `${TABS[1]}}`,
        ].join('\n'));
    });

    it('should return empty string if no components', () => {
        expect(generateHTMLElementTagNameMap([])).toBe('');
    });
});
