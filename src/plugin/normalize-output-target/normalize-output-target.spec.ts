import { Config } from '@stencil/core';
import { normalizeOutputTarget } from './normalize-output-target';
import { NormalizedOutputTargetStrictEventListeners } from '../../types';
import path from 'path';

describe('normalizeOutputTarget', () => {
  let mockRootDir: string;
  let config: Config;
  beforeEach(() => {
    mockRootDir = 'mock-root';

    config = {
      rootDir: mockRootDir,
    } as Config;
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should provide default values for output target', () => {
    const expectedResult: NormalizedOutputTargetStrictEventListeners = {
      outputPaths: [`${mockRootDir}/src/component-event-listeners.d.ts`, `${mockRootDir}/dist/types/component-event-listeners.d.ts`],
      importPath: './components',
      excludeComponents: [],
    };

    expect(normalizeOutputTarget(config, {})).toStrictEqual(expectedResult);
  });

  it('should allow for absolute paths and relative paths', () => {
    const expectedResult: NormalizedOutputTargetStrictEventListeners = {
      outputPaths: [`mock/absolute/path/output.d.ts`, `${mockRootDir}/mock/relative/path/output.d.ts`],
      importPath: './components',
      excludeComponents: [],
    };

    jest.spyOn(path, 'isAbsolute').mockReturnValueOnce(true);
    jest.spyOn(path, 'isAbsolute').mockReturnValueOnce(false);

    expect(
      normalizeOutputTarget(config, {
        outputPaths: [`mock/absolute/path/output.d.ts`, `mock/relative/path/output.d.ts`],
      }),
    ).toStrictEqual(expectedResult);
  });

  it('should throw error if config is missing rootDir', () => {
    jest.spyOn(path, 'isAbsolute').mockReturnValueOnce(true);
    jest.spyOn(path, 'isAbsolute').mockReturnValueOnce(false);

    expect(() => {
      normalizeOutputTarget({}, {});
    }).toThrowError('rootDir is not set and it should be set by stencil itself');
  });

  it('should allow importPath to be set', () => {
    const expectedResult: NormalizedOutputTargetStrictEventListeners = {
      outputPaths: [`${mockRootDir}/stub`],
      importPath: './some/custom/import/path',
      excludeComponents: [],
    };

    expect(
      normalizeOutputTarget(config, {
        outputPaths: ['stub'],
        importPath: './some/custom/import/path',
      }),
    ).toStrictEqual(expectedResult);
  });

  it('should allow excludeComponents to be set', () => {
    const expectedResult: NormalizedOutputTargetStrictEventListeners = {
      outputPaths: [`${mockRootDir}/stub`],
      excludeComponents: ['first-component', 'second-component'],
      importPath: './components',
    };

    expect(
      normalizeOutputTarget(config, {
        outputPaths: ['stub'],
        excludeComponents: ['first-component', 'second-component'],
      }),
    ).toStrictEqual(expectedResult);
  });
});
