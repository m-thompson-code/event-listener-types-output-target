/* eslint-disable @typescript-eslint/no-unused-vars */
import { BuildCtx, ComponentCompilerMeta, LoggerTimeSpan } from '@stencil/core/internal';

export const stubBuildCtx = (components: ComponentCompilerMeta[]): BuildCtx => {
  return {
    components,
    createTimeSpan: (msg: string, debug?: boolean) => {
      return {
        finish: (finishedMsg: string, color?: string, bold?: boolean, newLineSuffix?: boolean) => {
          /** stub */
        },
      } as LoggerTimeSpan;
    },
  } as BuildCtx;
};
