"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheck = void 0;
const healthCheck = async (_req, _res) => {
    _res.json({ message: "OK" });
};
exports.healthCheck = healthCheck;
