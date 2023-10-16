import { Config } from '@stencil/core/internal';
import path from 'path';
import { OutputTargetStrictEventListeners, NormalizedOutputTargetStrictEventListeners } from '../../types';
import { normalizePath } from '../../utilities';

export const normalizeOutputTarget = (config: Config, outputTarget: OutputTargetStrictEventListeners): NormalizedOutputTargetStrictEventListeners => {
  const rootDir = config.rootDir;

  if (rootDir == null) {
    throw new Error('rootDir is not set and it should be set by stencil itself');
  }

  return {
    ...outputTarget,
    outputPaths: (outputTarget.outputPaths || ['src/component-event-listeners.d.ts']).map(outputPath =>
      path.isAbsolute(outputPath) ? outputPath : normalizePath(path.join(rootDir, outputPath)),
    ),
    importPath: outputTarget.importPath || './components',
    excludeComponents: outputTarget.excludeComponents || [],
  };
};
