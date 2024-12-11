"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const successResponse = (res, status, message, data = null) => {
    // logging(Section.SERVER, `[REQUEST] [${req.method}],[${req.url}]`);
    return res.status(status).json({
        status,
        success: true,
        message,
        data,
    });
};
exports.successResponse = successResponse;
const errorResponse = (res, status, message, error = null) => {
    return res.status(status).json({
        status,
        success: false,
        message,
        error: Array.isArray(error) ? error : [error],
    });
};
exports.errorResponse = errorResponse;
