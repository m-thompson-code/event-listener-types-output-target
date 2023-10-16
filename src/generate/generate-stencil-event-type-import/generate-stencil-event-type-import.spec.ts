import { generateStencilEventTypeImport } from './generate-stencil-event-type-import';
import { stubComponentCompilerEvent, stubComponentCompilerMeta } from '../../tests';
import { TABS } from '../../consts';
import { ComponentCompilerEventComplexType } from '@stencil/core/internal';

describe('generateStencilEventTypeImport', () => {
  it("should generate import a single component's custom event type", () => {
    expect(generateStencilEventTypeImport([stubComponentCompilerMeta({ events: [stubComponentCompilerEvent()] })], './components')).toBe(
      ['import {', `${TABS[1]}StubCmpCustomEvent,`, `${TABS[1]}UserImplementedEventType,`, "} from './components';"].join('\n'),
    );
  });

  it("should generate import for multiple component's custom event type", () => {
    expect(
      generateStencilEventTypeImport(
        [
          stubComponentCompilerMeta({ tagName: 'first-cmp', events: [stubComponentCompilerEvent()] }),
          stubComponentCompilerMeta({ tagName: 'second-cmp', events: [stubComponentCompilerEvent()] }),
        ],
        './components',
      ),
    ).toBe(['import {', `${TABS[1]}FirstCmpCustomEvent,`, `${TABS[1]}UserImplementedEventType,`, `${TABS[1]}SecondCmpCustomEvent,`, "} from './components';"].join('\n'));
  });

  it("should generate import for multiple component's custom event type", () => {
    const duplicateType = 'SomeDuplicateType';
    const duplicateComplexType = {
      original: duplicateType,
      references: {
        [duplicateType]: {
          id: 'placeholder',
          location: 'import',
          path: './resources',
        },
      },
      resolved: duplicateType,
    } as ComponentCompilerEventComplexType;
    expect(
      generateStencilEventTypeImport(
        [
          stubComponentCompilerMeta({
            tagName: 'first-cmp',
            events: [stubComponentCompilerEvent({ complexType: duplicateComplexType })],
          }),
          stubComponentCompilerMeta({ tagName: 'second-cmp', events: [stubComponentCompilerEvent({ complexType: duplicateComplexType })] }),
        ],
        './components',
      ),
    ).toBe(['import {', `${TABS[1]}FirstCmpCustomEvent,`, `${TABS[1]}${duplicateType},`, `${TABS[1]}SecondCmpCustomEvent,`, "} from './components';"].join('\n'));
  });

  it('should generate imports to a settable import path', () => {
    const customPath = 'a-custom-path';
    expect(generateStencilEventTypeImport([stubComponentCompilerMeta({ events: [stubComponentCompilerEvent()] })], customPath)).toBe(
      ['import {', `${TABS[1]}StubCmpCustomEvent,`, `${TABS[1]}UserImplementedEventType,`, `} from '${customPath}';`].join('\n'),
    );
  });
});
