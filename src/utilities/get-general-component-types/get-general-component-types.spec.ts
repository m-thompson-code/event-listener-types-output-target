import { getGeneralComponentTypes } from './get-general-component-types';
import { stubComponentCompilerMeta } from '../../tests';

describe('getGeneralComponentTypes', () => {
  it('should generate general type names for component', () => {
    expect(getGeneralComponentTypes(stubComponentCompilerMeta())).toStrictEqual({
      tagName: 'stub-cmp',
      tagNameAsPascal: 'StubCmp',
      htmlElementName: 'HTMLStubCmpElement',
      customEventName: 'StubCmpCustomEvent',
      htmlElementEventMapName: 'HTMLStubCmpElementEventMap',
    });
  });
});
