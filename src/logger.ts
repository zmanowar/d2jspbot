/* eslint no-console: 0 */
function logFactory(prefix: string = null) {
  return function(...args) {
    if (prefix) {
      args.unshift(`${prefix} `, args);
    }
    console.log.apply(console, args);
  };
}

export const log = logFactory();
export const error = logFactory("ERROR");
