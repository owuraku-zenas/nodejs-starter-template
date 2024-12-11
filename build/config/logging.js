"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logging = exports.Section = void 0;
var Section;
(function (Section) {
    Section["DATABASE"] = "DATABASE";
    Section["SERVER"] = "SEVER";
    Section["CONTROLLER"] = "CONTROLLER";
})(Section || (exports.Section = Section = {}));
const getTimeStamp = () => {
    return new Date().toISOString();
};
const logging = (section, message) => {
    console.log(`[${getTimeStamp()}] [${section}] ${message}`);
};
exports.logging = logging;
