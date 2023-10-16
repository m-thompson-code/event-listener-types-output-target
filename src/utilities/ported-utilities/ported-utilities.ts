/**
 * This file has been ported from [@ionic-team/stencil-ds-output-targets](https://github.com/ionic-team/stencil-ds-output-targets)
 *
 * https://github.com/ionic-team/stencil-ds-output-targets/blob/main/packages/angular-output-target/src/utils.ts
 * https://github.com/ionic-team/stencil-ds-output-targets/blob/main/packages/angular-output-target/src/output-angular.ts#L39
 */
const moo = 'cow';
import { ComponentCompilerMeta } from '@stencil/core/internal';

const EXTENDED_PATH_REGEX = /^\\\\\?\\/;
// eslint-disable-next-line no-control-regex
const NON_ASCII_REGEX = /[^\x00-\x80]+/;
const SLASH_REGEX = /\\/g;

/**
 * This file has been ported from [@ionic-team/stencil-ds-output-targets](https://github.com/ionic-team/stencil-ds-output-targets)
 *
 * https://github.com/ionic-team/stencil-ds-output-targets/blob/main/packages/angular-output-target/src/utils.ts#L19
 */
export function sortBy<T>(array: T[], prop: (item: T) => string): T[] {
  return array.slice().sort((a, b) => {
    const nameA = prop(a);
    const nameB = prop(b);
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
}

/**
 * This file has been ported from [@ionic-team/stencil-ds-output-targets](https://github.com/ionic-team/stencil-ds-output-targets)
 *
 * https://github.com/ionic-team/stencil-ds-output-targets/blob/main/packages/angular-output-target/src/utils.ts#L29
 */
export function normalizePath(str: string): string {
  // Convert Windows backslash paths to slash paths: foo\\bar ➔ foo/bar
  // https://github.com/sindresorhus/slash MIT
  // By Sindre Sorhus
  if (typeof str !== 'string') {
    throw new Error(`invalid path to normalize`);
  }
  str = str.trim();

  if (EXTENDED_PATH_REGEX.test(str) || NON_ASCII_REGEX.test(str)) {
    return str;
  }

  str = str.replace(SLASH_REGEX, '/');

  // always remove the trailing /
  // this makes our file cache look ups consistent
  if (str.charAt(str.length - 1) === '/') {
    const colonIndex = str.indexOf(':');
    if (colonIndex > -1) {
      if (colonIndex < str.length - 2) {
        str = str.substring(0, str.length - 1);
      }
    } else if (str.length > 1) {
      str = str.substring(0, str.length - 1);
    }
  }

  return str;
}

/**
 * This file has been ported from [@ionic-team/stencil-ds-output-targets](https://github.com/ionic-team/stencil-ds-output-targets)
 *
 * https://github.com/ionic-team/stencil-ds-output-targets/blob/main/packages/angular-output-target/src/output-angular.ts#L39
 */
export function getFilteredComponents(excludeComponents: string[] = [], cmps: ComponentCompilerMeta[]): ComponentCompilerMeta[] {
  return sortBy(cmps, cmp => cmp.tagName).filter(c => !excludeComponents.includes(c.tagName) && !c.internal);
}
