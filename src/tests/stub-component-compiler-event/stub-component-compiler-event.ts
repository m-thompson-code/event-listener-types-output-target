/**
 * This file has been ported from [@ionic-team/stencil](https://github.com/ionic-team/stencil)
 *
 * https://github.com/ionic-team/stencil/blob/main/src/compiler/types/tests/ComponentCompilerEvent.stub.ts#L10
 */

import { ComponentCompilerEvent } from '@stencil/core/internal';

/**
 * This file has been ported from [@ionic-team/stencil](https://github.com/ionic-team/stencil)
 *
 * https://github.com/ionic-team/stencil/blob/main/src/compiler/types/tests/ComponentCompilerEvent.stub.ts#L10
 *
 * -----
 *
 * Generates a stub {@link ComponentCompilerEvent}. This function uses sensible defaults for the initial stub. However,
 * any field in the object may be overridden via the `overrides` argument.
 * @param overrides a partial implementation of `ComponentCompilerEvent`. Any provided fields will override the
 * defaults provided by this function.
 * @returns the stubbed `ComponentCompilerEvent`
 */
export const stubComponentCompilerEvent = (overrides: Partial<ComponentCompilerEvent> = {}): ComponentCompilerEvent => {
  const defaults: ComponentCompilerEvent = {
    bubbles: true,
    cancelable: true,
    composed: true,
    internal: false,
    name: 'myEvent',
    method: 'myEvent',
    complexType: {
      original: 'UserImplementedEventType',
      resolved: '"foo" | "bar"',
      references: {
        UserImplementedEventType: {
          id: 'placeholder',
          location: 'import',
          path: './resources',
        },
      },
    },
    docs: { text: 'docs', tags: [] },
  };

  return { ...defaults, ...overrides };
};
