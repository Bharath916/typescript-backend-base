"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteToken = exports.findByToken = exports.updateToken = exports.AccessTokenModel = exports.TOKEN_EXPIRY = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const helper_1 = require("../utils/helper");
const config_1 = require("../config/config");
const bson_1 = require("bson");
const getModels_1 = require("../seed/getModels");
const Config = new config_1.config();
// Token expiry: 6 hours
exports.TOKEN_EXPIRY = 60 * 60 * 6;
// Define schema
const AccessTokenSchema = new mongoose_1.Schema({
    token: { type: String, index: true, unique: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "users", index: true },
    createdAt: { type: Date, default: Date.now, expires: exports.TOKEN_EXPIRY },
}, {
    bufferCommands: false,
    versionKey: false,
});
// ✅ Avoid OverwriteModelError
exports.AccessTokenModel = mongoose_1.default.models.accessToken ||
    mongoose_1.default.model("accessToken", AccessTokenSchema);
// Register in dynamicModels if not already added
const outcome = (0, helper_1.findJsonInJsonArray)(Config.dynamicModels, "accessToken", "name");
if (!outcome) {
    let obj = {};
    (0, helper_1.addJson)(obj, "name", "accessToken");
    (0, helper_1.addJson)(obj, "model", exports.AccessTokenModel);
    Config.dynamicModels.push(obj);
}
// ✅ Update token (callback style)
const updateToken = function (model, token, userId, cb) {
    const tokenObj = {
        token,
        userId: new bson_1.ObjectId(userId),
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
    };
    // ✅ getCollectionObject should also avoid overwriting models
    const collection = mongoose_1.default.models[model] ||
        (0, getModels_1.getCollectionObject)(model, new mongoose_1.Schema({}, { strict: false }));
    collection.insertMany([tokenObj], {}, function (err, result) {
        if (err) {
            console.error("Error inserting token:", err);
            return cb(err, null);
        }
        cb(null, result);
    });
};
exports.updateToken = updateToken;
// ✅ Find by token
const findByToken = function (model, token, cb) {
    model.findOne({ token }, function (err, result) {
        cb(err, result);
    });
};
exports.findByToken = findByToken;
// ✅ Delete token
const deleteToken = function (model, userId, cb) {
    userId = new bson_1.ObjectId(userId);
    model.deleteMany({ userId }, {}, (err, result) => {
        console.log("Deleted:", result);
        cb(err);
    });
};
exports.deleteToken = deleteToken;
//# sourceMappingURL=accesstoken.js.map