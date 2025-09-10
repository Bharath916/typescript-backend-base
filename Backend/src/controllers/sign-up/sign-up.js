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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.createUserRegister = void 0;
const models_1 = require("../../models/models");
const config_1 = require("../../config/config");
const Users = __importStar(require("../../models/user"));
const AccessToken = __importStar(require("../../models/accesstoken"));
const RefreshToken = __importStar(require("../../models/refreshtoken"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const moment_1 = __importDefault(require("moment"));
const multer = require("multer");
const XLSX = require("xlsx");
const Config = new config_1.config();
//user Registration logic
function createUserRegister(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let collectionName = Config.availableCollection.user;
            let newRecord = req.body;
            if (!collectionName || !newRecord) {
                res.json({
                    isSuccess: false,
                    error: models_1.ErrorCodes[1001],
                    customMsg: "Missing collection name || new record",
                    data: {},
                });
                next();
                return;
            }
            let addData = yield Users.CreateUser(collectionName, newRecord);
            if (addData) {
                res.send({
                    isSuccess: true,
                    data: "added successfully",
                });
            }
            else {
                res.send({
                    isSuccess: false,
                    error: models_1.ErrorCodes[1003],
                    customMsg: "failed to add data",
                });
            }
        }
        catch (error) {
            req.apiStatus = {
                isSuccess: false,
                error: models_1.ErrorCodes[1002],
                customMsg: "Failed to add data",
                data: {},
            };
            next();
            return;
        }
    });
}
exports.createUserRegister = createUserRegister;
//login functionality
function login(req, res) {
    if (req.body && req.body.email && req.body.password) {
        var username = req.body.email;
        var password = req.body.password;
        Users.findByEmailId(Config.availableCollection.user, username, function (err, user) {
            if (err || !user) {
                let responseObj = new models_1.ResponseObj(404, "Incorrect username or password ", undefined);
                res.status(responseObj.status).json(responseObj);
                return;
            }
            else {
                Users.compareSaltedPassword(password, user.password, function (pwdErr, isMatch) {
                    if (isMatch) {
                        let userJson = JSON.stringify(user);
                        userJson = JSON.parse(userJson);
                        generateAndSaveAccessToken(req, userJson, function (accessToken, expiresAt) {
                            if (!accessToken || !expiresAt) {
                                let responseObj = new models_1.ResponseObj(500, "Internal Error", null);
                                res.status(responseObj.status).json(responseObj);
                                return;
                            }
                            generateAndSaveRefreshToken(req, userJson, function (refreshToken, refreshExpiredAt) {
                                if (!refreshToken || !expiresAt) {
                                    let responseObj = new models_1.ResponseObj(500, "Internal Error", null);
                                    res.status(responseObj.status).json(responseObj);
                                    return;
                                }
                                delete userJson.password;
                                //delete userJson._id;
                                delete userJson.isEnabled;
                                delete userJson.__v;
                                userJson.access_token = accessToken;
                                userJson.refresh_token = refreshToken;
                                userJson.tokenExpiresAt = expiresAt;
                                let responseObj = new models_1.ResponseObj(200, "Success", userJson);
                                res.status(responseObj.status).json(responseObj);
                            });
                        });
                    }
                    else {
                        let responseObj = new models_1.ResponseObj(400, "Incorrect username or password ", undefined);
                        res.status(responseObj.status).json(responseObj);
                    }
                });
            }
        });
    }
}
exports.login = login;
// /************** Helper Functions ******************/
const jwtSecret = "J434dgeBPTsd5GsdGORD91C";
function generateAndSaveAccessToken(req, user, cb) {
    let token = jsonwebtoken_1.default.sign({ email: user.email }, jwtSecret, {
        expiresIn: AccessToken.TOKEN_EXPIRY * 60,
    });
    AccessToken.updateToken(
    // req.model[config.availableCollections.accesstokens],
    Config.availableCollection.accessToken, token, user._id, 
    // req.query.orgCode, // added as extra param after implementation of multiple db
    function (err, result) {
        if (err || !result) {
            // logger.error(req.txId, "Error saving token: " + err);
            cb(null, null);
        }
        else {
            // logger.verbose(req.txId, "Access Token details: " + result);
            let expiresAt = (0, moment_1.default)(result.createdAt)
                .add(AccessToken.TOKEN_EXPIRY, "m")
                .utc();
            cb(token, expiresAt);
        }
    });
}
function generateAndSaveRefreshToken(req, user, cb) {
    let token = jsonwebtoken_1.default.sign({ email: user.email }, jwtSecret, {
        expiresIn: RefreshToken.TOKEN_EXPIRY * 60,
    });
    RefreshToken.updateToken(Config.availableCollection.refreshToken, token, user._id, function (err, result) {
        if (err || !result) {
            // logger.error(req.txId, "Error saving token: " + err);
            cb(null, null);
        }
        else {
            // logger.verbose(req.txId, "Refresh Token details: " + result);
            let expiresAt = (0, moment_1.default)(result.createdAt)
                .add(RefreshToken.TOKEN_EXPIRY, "m")
                .utc();
            cb(token, expiresAt);
        }
    });
}
//# sourceMappingURL=sign-up.js.map