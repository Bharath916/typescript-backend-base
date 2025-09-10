"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exitPoint = void 0;
const models_1 = require("../models/models");
function exitPoint(req, res) {
    if (req.apiStatus.isSuccess) {
        let responseObj = new models_1.ResponseObj(200, "Success", req.apiStatus.data);
        if (req.apiStatus.customMsg) {
            responseObj.message = req.apiStatus.customMsg;
        }
        res.status(responseObj.status).json(responseObj);
    }
    else {
        let responseObj = new models_1.ResponseObj(req.apiStatus.error.statusCode, req.apiStatus.error.message, req.apiStatus.data);
        if (req.apiStatus.customMsg) {
            responseObj["message"] = req.apiStatus.customMsg;
        }
        req.status(responseObj.status).json(responseObj);
    }
}
exports.exitPoint = exitPoint;
//# sourceMappingURL=exitPoint.js.map