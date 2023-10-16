import { eventListenerTypesOutputTarget } from './event-listener-types-output-target';
import { NormalizedOutputTargetStrictEventListeners } from '../../types';
import { Config } from '@stencil/core';
import { BuildCtx, CompilerCtx, LoggerTimeSpan } from '@stencil/core/internal';
import { stubBuildCtx } from '../../tests';

const mockNormalizeOutputTarget = jest.fn();
jest.mock('../normalize-output-target', () => {
  return {
    normalizeOutputTarget: () => mockNormalizeOutputTarget(),
  };
});

const mockGenerator = jest.fn();
jest.mock('../generator', () => {
  return {
    generator: (config: Config, compilerCtx: CompilerCtx, buildCtx: BuildCtx) => mockGenerator(config, compilerCtx, buildCtx),
  };
});

const outputTargetName = 'strict event listener types';

describe('eventListenerTypesOutputTarget', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should return an output target', () => {
    expect(eventListenerTypesOutputTarget()).toStrictEqual({
      type: 'custom',
      name: outputTargetName,
      validate: expect.any(Function),
      generator: expect.any(Function),
    });
  });

  it('should use its ', done => {
    // Basic output target stubs
    const mockConfig = {} as Config;
    const mockCompilerCtx = {} as CompilerCtx;
    const mockBuildCtx = stubBuildCtx([]);
    const mockTimespan = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      finish: (_arg: string) => {
        /** stub */
      },
    } as LoggerTimeSpan;
    // Spies involving TimeSpan
    const createTimeSpanSpy = jest.spyOn(mockBuildCtx, 'createTimeSpan').mockReturnValueOnce(mockTimespan);
    const createTimeSpanFinishSpy = jest.spyOn(mockTimespan, 'finish');

    // Spies involving normalizeOutputTarget()
    const mockOutputTarget = {} as NormalizedOutputTargetStrictEventListeners;
    mockNormalizeOutputTarget.mockReturnValueOnce(mockOutputTarget);
    mockGenerator.mockReturnValueOnce(Promise.resolve());

    // Create output target to start tests
    const outputTarget = eventListenerTypesOutputTarget();

    // Test outputTarget.validate()
    expect(mockNormalizeOutputTarget).toHaveBeenCalledTimes(0);
    outputTarget.validate!(mockConfig, []);
    // Verify that normalizeOutputTarget() has been used
    expect(mockNormalizeOutputTarget).toHaveBeenCalledTimes(1);

    // Test outputTarget.generator()
    expect(mockGenerator).toHaveBeenCalledTimes(0);
    // Verify behavior before Promise resolves
    const promise = outputTarget.generator(mockConfig, mockCompilerCtx, mockBuildCtx, {});
    // Verify that TimeSpan prints that generation has started
    expect(createTimeSpanSpy).toBeCalledWith(`generate ${outputTargetName} started`, true);
    // Verify that generator has started
    expect(mockGenerator).toHaveBeenCalledTimes(1);
    expect(mockGenerator).toBeCalledWith(mockConfig, mockCompilerCtx, mockBuildCtx);

    expect(createTimeSpanFinishSpy).toHaveBeenCalledTimes(0);

    // Test behavior after Promise resolves
    promise.then(() => {
      // Verify that TimeSpan prints that generation has finished
      expect(createTimeSpanFinishSpy).toHaveBeenCalledTimes(1);
      expect(createTimeSpanFinishSpy).toBeCalledWith(`generate ${outputTargetName} finished`);
      done();
    });
  });
});
