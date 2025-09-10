"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logLevel = exports.logModule = void 0;
var logModule;
(function (logModule) {
    logModule["User"] = "USER";
    logModule["AUTH"] = "AUTH";
    logModule["ROUTE"] = "ROUTE";
    logModule["CONTENT"] = "CONTENT";
})(logModule || (exports.logModule = logModule = {}));
var logLevel;
(function (logLevel) {
    logLevel["VERBOSE"] = "VERBOSE";
    logLevel["DEBUG"] = "DEBUG";
    logLevel["INFO"] = "INFO";
    logLevel["WARNING"] = "WARNING";
    logLevel["ERROR"] = "ERROR";
})(logLevel || (exports.logLevel = logLevel = {}));
//# sourceMappingURL=logs.js.map