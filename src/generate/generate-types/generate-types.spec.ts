import { ComponentCompilerMeta } from '@stencil/core/internal';
import { generateTypes } from './generate-types';
import { stubComponentCompilerMeta } from '../../tests';

const mockGenerateComments = jest.fn();
jest.mock('../generate-comments', () => {
  return {
    generateComments: () => {
      return mockGenerateComments.mockImplementation(() => `/** stub comments */`)();
    },
  };
});

const mockGenerateStencilEventTypeImport = jest.fn();
jest.mock('../generate-stencil-event-type-import', () => {
  return {
    generateStencilEventTypeImport: (cmps: ComponentCompilerMeta[], importPath: string) => {
      return mockGenerateStencilEventTypeImport.mockImplementation(
        (cmps: ComponentCompilerMeta[], importPath: string) => `/** import stub ${cmps.map(cmp => cmp.tagName)} from ${importPath} */`,
      )(cmps, importPath);
    },
  };
});

const mockGenerateEventMaps = jest.fn();
jest.mock('../generate-event-maps', () => {
  return {
    generateEventMaps: (cmps: ComponentCompilerMeta[]) => {
      return mockGenerateEventMaps.mockImplementation((cmps: ComponentCompilerMeta[]) => `interface MockGeneratedEventMaps {/** mock ${cmps.map(cmp => cmp.tagName)} */}`)(cmps);
    },
  };
});

const mockGenerateGlobalType = jest.fn();
jest.mock('../generate-global-type', () => {
  return {
    generateGlobalType: (cmps: ComponentCompilerMeta[]) => {
      return mockGenerateGlobalType.mockImplementation((cmps: ComponentCompilerMeta[]) => `declare global {/** stub ${cmps.map(cmp => cmp.tagName)} */}`)(cmps);
    },
  };
});

describe('generateTypes', () => {
  it('should generate global types based on components', () => {
    const components = [stubComponentCompilerMeta()];
    expect(generateTypes(components, 'some-import-path')).toBe(
      [
        '/** stub comments */',
        '',
        '/** import stub stub-cmp from some-import-path */',
        '',
        'interface MockGeneratedEventMaps {/** mock stub-cmp */}',
        '',
        'declare global {/** stub stub-cmp */}',
        '',
      ].join('\n'),
    );
  });

  it('should return just comments if no components', () => {
    expect(generateTypes([], 'some-import-path')).toBe(['/** stub comments */', ''].join('\n'));
  });
});
