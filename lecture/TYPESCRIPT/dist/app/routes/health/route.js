"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("./controller"));
function register() {
    const router = express_1.default.Router();
    const controller = new controller_1.default();
    router.get('/', controller.handleHealthCheck.bind(controller));
    return router;
}
