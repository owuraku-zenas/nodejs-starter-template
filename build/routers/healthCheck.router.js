"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const healthCheck_controller_1 = require("../controllers/healthCheck.controller");
const healthCheckRouter = (0, express_1.Router)();
healthCheckRouter.get("", healthCheck_controller_1.healthCheck);
exports.default = healthCheckRouter;
