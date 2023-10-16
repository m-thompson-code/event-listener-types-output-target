import type { BuildCtx, CompilerCtx } from '@stencil/core/internal';
import type { NormalizedOutputTargetStrictEventListeners } from '../../types';
import { generateTypes } from '../../generate';
import { getFilteredComponents, filterComponentsWithEvents } from '../../utilities';

export const generator = async (outputTarget: NormalizedOutputTargetStrictEventListeners, compilerCtx: CompilerCtx, buildCtx: BuildCtx): Promise<void> => {
  const timespan = buildCtx.createTimeSpan(`generate strict event listeners started`, true);

  const components = getFilteredComponents(outputTarget.excludeComponents, filterComponentsWithEvents(buildCtx.components));

  const types = generateTypes(components, outputTarget.importPath);

  await Promise.all(outputTarget.outputPaths.map(outputPath => compilerCtx.fs.writeFile(outputPath, types)));

  timespan.finish(`generate strict event listeners finished`);
};
