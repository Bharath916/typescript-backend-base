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
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageAlert = exports.aggregatedPolicyWithUser = exports.searchByUserName = exports.bulkData = exports.deleteData = exports.UpdateData = exports.getOneData = exports.getData = exports.createData = void 0;
const models_1 = require("../models/models");
const DynamicModel = __importStar(require("../models/dynamicModels"));
const config_1 = require("../config/config");
const multer = require("multer");
const XLSX = require("xlsx");
const Config = new config_1.config();
//Add logic
function createData(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let collectionName = Config.availableCollection.agent;
            let newRecord = req.body;
            if (!collectionName || !newRecord) {
                res.send({
                    isSuccess: false,
                    error: models_1.ErrorCodes[1001],
                    customMsg: "Missing collection name || new record",
                    data: {},
                });
                next();
                return;
            }
            let addRecord = yield DynamicModel.add(collectionName, newRecord);
            if (addRecord) {
                res.send({
                    isSuccess: true,
                    data: "Added successfully",
                });
            }
            else {
                res.send({
                    isSuccess: false,
                    error: models_1.ErrorCodes[1001],
                    data: {},
                });
                next();
                return;
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
exports.createData = createData;
//getData
function getData(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let collectionName = Config.availableCollection.agent;
            if (!collectionName) {
                res.json({
                    isSuccess: false,
                    error: models_1.ErrorCodes[1001],
                    data: {},
                }),
                    next();
                return;
            }
            let findData = yield DynamicModel.getData(collectionName, {}, {}, {});
            // console.log("findData", findData);
            if (findData && findData.length) {
                res.json({
                    isSuccess: true,
                    customMsg: "data fetched successfully",
                    data: findData,
                });
                next();
                // return;
            }
        }
        catch (error) {
            res.json({
                isSuccess: false,
                error: models_1.ErrorCodes[1004],
                customMsg: "FAILED TO FETCH DATA",
                data: {},
            }),
                next();
            return;
        }
    });
}
exports.getData = getData;
//getOne data
function getOneData(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let collectionName = Config.availableCollection.agent;
            let id = req.params.id;
            if (!collectionName && !id) {
                res.json({
                    isSuccess: false,
                    error: models_1.ErrorCodes[1001],
                    customMsg: "Missing collection name || id",
                    data: {},
                });
                next();
                return;
            }
            let getOneDataById = yield DynamicModel.GetfindOne(collectionName, id);
            if (getOneDataById) {
                res.json({
                    isSuccess: true,
                    customMsg: "DATA FETCH SUCCESSFULL",
                    data: getOneDataById,
                });
                next();
                return;
            }
            else {
                res.json({
                    isSuccess: false,
                    error: models_1.ErrorCodes[1004],
                    customMsg: "FAILED TO FETCH DATA",
                    data: {},
                });
                next();
                return;
            }
        }
        catch (error) {
            res.json({
                isSuccess: false,
                error: models_1.ErrorCodes[1004],
                customMsg: "FAILED TO FETCH DATA 2222",
                data: {},
            });
            next();
            return;
        }
    });
}
exports.getOneData = getOneData;
//update functionality
function UpdateData(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let collectionName = Config.availableCollection.agent;
            let id = req.params.id;
            let body = req.body;
            if (!collectionName && !id && !body) {
                res.json({
                    isSuccess: false,
                    error: models_1.ErrorCodes[1001],
                    customMsg: "Missing collection name || new record",
                    data: {},
                }),
                    next();
                return;
            }
            let updatedData = yield DynamicModel.updateData(collectionName, id, body);
            if (updatedData) {
                res.json({
                    isSuccess: true,
                    customMsg: "DATA UPDATE SUCCESSFULLY",
                    data: {},
                });
                next();
            }
            else {
                res.json({
                    isSuccess: false,
                    error: models_1.ErrorCodes[1007],
                    customMsg: "FAILED TO UPDATE DATA",
                    data: {},
                });
                next();
                return;
            }
        }
        catch (error) {
            res.json({
                isSuccess: false,
                error: models_1.ErrorCodes[1007],
                customMsg: "FAILED TO UPDATE DATA",
                data: {},
            });
            next();
            return;
        }
    });
}
exports.UpdateData = UpdateData;
//delete record
function deleteData(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let collectionName = Config.availableCollection.agent;
            let id = req.params.id;
            if (!collectionName && !id) {
                res.json({
                    isSuccess: false,
                    error: models_1.ErrorCodes[1001],
                    customMsg: "Missing collection name || new record",
                    data: {},
                });
                next();
                return;
            }
            let deleteRecord = yield DynamicModel.deleteData(collectionName, id);
            // console.log("deleteRecord", deleteRecord);
            if (deleteRecord) {
                res.json({
                    isSuccess: true,
                    customMsg: "DATA DELETE SUCCESSFULL",
                    data: {},
                });
                next();
            }
            else {
                res.json({
                    isSuccess: false,
                    error: models_1.ErrorCodes[1005],
                    customMsg: "FAILED TO DELETE DATA 232323",
                    data: {},
                });
                next();
                return;
            }
        }
        catch (error) {
            res.json({
                isSuccess: false,
                error: models_1.ErrorCodes[1008],
                customMsg: "FAILED TO DELETE DATA",
                data: {},
            });
            next();
            return;
        }
    });
}
exports.deleteData = deleteData;
//bulk uploading data
function bulkData(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const fileLocation = req.file.path;
            //   console.log("location",fileLocation);
            var workbook = XLSX.readFile(fileLocation);
            var sheet_name_list = workbook.SheetNames;
            //   console.log("sheet_name_list",sheet_name_list);
            var JsonResult = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
            // let getpolicyInfo: any;
            let insertedUser;
            const promises = JsonResult === null || JsonResult === void 0 ? void 0 : JsonResult.map((obj) => __awaiter(this, void 0, void 0, function* () {
                const promises1 = [];
                if (obj === null || obj === void 0 ? void 0 : obj.agent) {
                    promises1.push(DynamicModel.add(Config.availableCollection.agent, {
                        agent: obj === null || obj === void 0 ? void 0 : obj.agent,
                        createdAt: new Date(),
                    }));
                }
                if (obj === null || obj === void 0 ? void 0 : obj.account_name) {
                    promises1.push(DynamicModel.add(Config.availableCollection.usersAccount, {
                        account_name: obj === null || obj === void 0 ? void 0 : obj.account_name,
                        createdAt: new Date(),
                    }));
                }
                if (obj === null || obj === void 0 ? void 0 : obj.category_name) {
                    promises1.push(DynamicModel.add(Config.availableCollection.policyCategory, {
                        // userId: String(insertedUser[0]._id),
                        category_name: obj === null || obj === void 0 ? void 0 : obj.category_name,
                        createdAt: new Date(),
                    }));
                }
                if (obj === null || obj === void 0 ? void 0 : obj.company_name) {
                    promises1.push(DynamicModel.add(Config.availableCollection.policyCarrier, {
                        company_name: obj === null || obj === void 0 ? void 0 : obj.company_name,
                        createdAt: new Date(),
                    }));
                }
                if ((obj === null || obj === void 0 ? void 0 : obj.firstname) &&
                    (obj === null || obj === void 0 ? void 0 : obj.dob) &&
                    (obj === null || obj === void 0 ? void 0 : obj.address) &&
                    (obj === null || obj === void 0 ? void 0 : obj.phone) &&
                    (obj === null || obj === void 0 ? void 0 : obj.state) &&
                    (obj === null || obj === void 0 ? void 0 : obj.zip) &&
                    (obj === null || obj === void 0 ? void 0 : obj.email) &&
                    (obj === null || obj === void 0 ? void 0 : obj.userType)) {
                    const insertedUserData = yield DynamicModel.add(Config.availableCollection.user, {
                        firstname: obj === null || obj === void 0 ? void 0 : obj.firstname,
                        dob: obj === null || obj === void 0 ? void 0 : obj.dob,
                        address: obj === null || obj === void 0 ? void 0 : obj.address,
                        phone: obj === null || obj === void 0 ? void 0 : obj.phone,
                        state: obj === null || obj === void 0 ? void 0 : obj.state,
                        zip: obj === null || obj === void 0 ? void 0 : obj.zip,
                        email: obj === null || obj === void 0 ? void 0 : obj.email,
                        usertype: obj === null || obj === void 0 ? void 0 : obj.userType,
                        createdAt: new Date(),
                    });
                    promises1.push(insertedUserData);
                    insertedUser = [...insertedUserData];
                }
                if ((obj === null || obj === void 0 ? void 0 : obj.policy_number) &&
                    (obj === null || obj === void 0 ? void 0 : obj.policy_start_date) &&
                    (obj === null || obj === void 0 ? void 0 : obj.policy_end_date) &&
                    (obj === null || obj === void 0 ? void 0 : obj.category_name) &&
                    insertedUser &&
                    insertedUser.length > 0) {
                    promises1.push(DynamicModel.add(Config.availableCollection.policyInfo, {
                        userId: String(insertedUser[0]._id),
                        policy_number: obj === null || obj === void 0 ? void 0 : obj.policy_number,
                        policy_start_date: obj === null || obj === void 0 ? void 0 : obj.policy_start_date,
                        policy_end_date: obj === null || obj === void 0 ? void 0 : obj.policy_end_date,
                        category_name: obj === null || obj === void 0 ? void 0 : obj.category_name,
                        createdAt: new Date(),
                    }));
                }
                return Promise.all(promises1);
            }));
            try {
                yield Promise.all(promises);
                // console.log("All database operations completed successfully.");
                res.json({
                    data: "All database operations completed successfully.",
                });
            }
            catch (error) {
                console.error("Error occurred during database operations:", error);
            }
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to add agent",
                error: error.message,
            });
        }
    });
}
exports.bulkData = bulkData;
//search API using userName
function searchByUserName(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let collectionName = Config.availableCollection.policyInfo;
            let id = req.params.id;
            let findPolicyInfo = yield DynamicModel.findOne(collectionName, id);
            if (findPolicyInfo) {
                res.json({
                    data: findPolicyInfo,
                });
            }
            else {
                res.json({
                    data: "failed to get data",
                });
            }
        }
        catch (error) {
            console.log(error);
            res.json(error);
        }
    });
}
exports.searchByUserName = searchByUserName;
//aggregated policy by each user
function aggregatedPolicyWithUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let collectionName = Config.availableCollection.policyInfo;
            let aggrQuery = [
                {
                    $addFields: {
                        userIds: {
                            $toObjectId: "$userId",
                        },
                    },
                },
                {
                    $lookup: {
                        from: Config.availableCollection.user,
                        localField: "userIds",
                        foreignField: "_id",
                        as: "result",
                    },
                },
                {
                    $unwind: {
                        path: "$result",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $project: {
                        _id: 1,
                        userId: 1,
                        policy_number: 1,
                        policy_start_date: 1,
                        policy_end_date: 1,
                        category_name: 1,
                        createdAt: 1,
                        firstName: "$result.firstname",
                        dob: "$result.dob",
                        address: "$result.address",
                        phone: "$result.phone",
                        state: "$result.state",
                        zip: "$result.zip",
                        email: "$result.email",
                        usertype: "$result.usertype",
                    },
                },
            ];
            let aggregatedResult = yield DynamicModel.aggregateAwait(collectionName, aggrQuery);
            if (aggregatedResult && aggregatedResult.length) {
                res.json({
                    data: aggregatedResult,
                });
            }
            else {
                res.json({
                    data: "Failed to aggregate data",
                });
            }
        }
        catch (error) {
            res.json(error);
        }
    });
}
exports.aggregatedPolicyWithUser = aggregatedPolicyWithUser;
//add messageAlert and store it into DB
function messageAlert(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let collectionName = Config.availableCollection.messageAlert;
            let body = req.body;
            body["createdAt"] = new Date();
            if (!collectionName || !body) {
                res.json({
                    isSuccess: false,
                    customMsg: "Missing collection name || body",
                });
                next();
                return;
            }
            let addMessage = yield DynamicModel.add(collectionName, body);
            if (addMessage) {
                res.json({
                    isSuccess: true,
                    data: "Added successfully",
                });
            }
        }
        catch (error) {
            res.json(error);
        }
    });
}
exports.messageAlert = messageAlert;
//# sourceMappingURL=index.js.map