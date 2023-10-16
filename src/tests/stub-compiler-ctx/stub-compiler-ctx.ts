import { CompilerCtx } from '@stencil/core/internal';

export const stubCompilerCtx = (): [Record<string, string>, CompilerCtx] => {
  const mockDirectory: Record<string, string> = {};

  const compilerCtx = {
    fs: {
      writeFile(filePath: string, content: string) {
        return Promise.resolve().then(() => {
          mockDirectory[filePath] = content;

          return {
            changedContent: true,
            queuedWrite: false,
            ignored: false,
          };
        });
      },
    },
  } as CompilerCtx;

  return [mockDirectory, compilerCtx];
};
