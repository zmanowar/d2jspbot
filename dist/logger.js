"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint no-console: 0 */
function logFactory(prefix) {
    if (prefix === void 0) { prefix = null; }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (prefix) {
            args.unshift(prefix + " ", args);
        }
        console.log.apply(console, args);
    };
}
exports.log = logFactory();
exports.error = logFactory("ERROR");
