import { getComponentTypes } from './get-component-types';
import { stubComponentCompilerMeta } from '../../tests';

describe('getComponentTypes', () => {
  it('should generate common type names for component', () => {
    expect(getComponentTypes(stubComponentCompilerMeta())).toStrictEqual({
      tagName: 'stub-cmp',
      tagNameAsPascal: 'StubCmp',
      htmlElementName: 'HTMLStubCmpElement',
      customEventName: 'StubCmpCustomEvent',
      htmlElementEventMapName: 'HTMLStubCmpElementEventMap',
    });
  });
});
