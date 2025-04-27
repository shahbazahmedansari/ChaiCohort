"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HealthController {
    handleHealthCheck(req, res) {
        return res.json({
            status: 'healthy',
        });
    }
}
exports.default = HealthController;
