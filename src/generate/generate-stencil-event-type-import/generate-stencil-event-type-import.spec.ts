import { generateStencilEventTypeImport } from "./generate-stencil-event-type-import";
import { stubComponentCompilerEvent, stubComponentCompilerMeta } from '../../tests';
import { TABS } from "../../consts";

describe('generateStencilEventTypeImport', () => {
    it('should generate import a single component\'s custom event type', () => {
        expect(generateStencilEventTypeImport([
            stubComponentCompilerMeta({ events: [stubComponentCompilerEvent()] }),
        ], './components')).toBe([
            'import {',
            `${TABS[1]}StubCmpCustomEvent,`,
            "} from './components';",
        ].join('\n'));
    });

    it('should generate import for multiple component\'s custom event type', () => {
        expect(generateStencilEventTypeImport([
            stubComponentCompilerMeta({ tagName: 'first-cmp', events: [stubComponentCompilerEvent()] }),
            stubComponentCompilerMeta({ tagName: 'second-cmp', events: [stubComponentCompilerEvent()] }),
        ], './components')).toBe([
            'import {',
            `${TABS[1]}FirstCmpCustomEvent,`,
            `${TABS[1]}SecondCmpCustomEvent,`,
            "} from './components';",
        ].join('\n'));
    });

    it('should generate imports to a settable import path', () => {
        const customPath = 'a-custom-path';
        expect(generateStencilEventTypeImport([
            stubComponentCompilerMeta({ events: [stubComponentCompilerEvent()] }),
        ], customPath)).toBe([
            'import {',
            `${TABS[1]}StubCmpCustomEvent,`,
            `} from '${customPath}';`,
        ].join('\n'));
    });

    it('should not generate imports for components without events', () => {
        expect(generateStencilEventTypeImport([
            stubComponentCompilerMeta({ tagName: 'first-cmp' }),
            stubComponentCompilerMeta({ tagName: 'second-cmp', events: [stubComponentCompilerEvent()] }),
        ], './components')).toBe([
            'import {',
            `${TABS[1]}SecondCmpCustomEvent,`,
            "} from './components';",
        ].join('\n'));
    });

    it('should not generate an import if no components', () => {
        expect(generateStencilEventTypeImport([], './components')).toBe('');
    });
});
