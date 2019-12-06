const bluebird = require("bluebird");

export function initPolyfills(global: NodeJS.Global) {
  // @ts-ignore
  global.Promise = bluebird;
}
