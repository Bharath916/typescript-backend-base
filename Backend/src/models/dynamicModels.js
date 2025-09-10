"use strict";
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
exports.findManyWithAwait = exports.findMany = exports.updateManyWithAwait = exports.updateOneWithAwait = exports.deleteData = exports.updateDataWithUpsertFalse = exports.updateData = exports.findOneWithAwait = exports.aggregateAwait = exports.findOne = exports.GetfindOne = exports.getData = exports.add = exports.schema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { getCollectionObject } = require("../seed/getModels");
const Schema = mongoose_1.default.Schema;
exports.schema = new Schema({}, { strict: false, versionKey: false });
//CRUD operations
//====Add api====//
var add = (collectionName, data) => {
    // data["createdAt"] = new Date();
    if (data && data.length) {
        data = [data];
    }
    return getCollectionObject(collectionName, exports.schema).insertMany(data);
};
exports.add = add;
//=====Get api====//
var getData = (collectionName, query, projection, options) => {
    return getCollectionObject(collectionName, exports.schema).find(query, projection, options);
};
exports.getData = getData;
//======findOne api=====//
var GetfindOne = (collectionName, id) => {
    return getCollectionObject(collectionName, exports.schema).findById({ _id: id });
};
exports.GetfindOne = GetfindOne;
var findOne = (collectionName, id) => {
    return getCollectionObject(collectionName, exports.schema).findOne({ userId: id });
};
exports.findOne = findOne;
var aggregateAwait = (collectionName, aggre) => {
    return getCollectionObject(collectionName, exports.schema).aggregate(aggre).exec();
};
exports.aggregateAwait = aggregateAwait;
var findOneWithAwait = function (model, query, options) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log("model 20", model);
        try {
            // console.log("model22", model);
            let resp = yield model.findOne(query, options);
            return resp;
        }
        catch (error) {
            return null;
        }
    });
};
exports.findOneWithAwait = findOneWithAwait;
//=====update api======//
var updateData = (collectionName, id, data) => {
    console.log("data", data, id, collectionName);
    let startDate = new Date();
    data["updatedAt"] = startDate;
    return getCollectionObject(collectionName, exports.schema).updateOne({ _id: id }, { $set: data }, { upsert: true });
};
exports.updateData = updateData;
//update with upsert false
var updateDataWithUpsertFalse = (collectionName, query, data) => {
    // console.log("data", data, id, collectionName);
    let startDate = new Date();
    data["updatedAt"] = startDate;
    return getCollectionObject(collectionName, exports.schema).updateOne(query, { $set: data }, { upsert: false });
};
exports.updateDataWithUpsertFalse = updateDataWithUpsertFalse;
//======delete api=====//
var deleteData = (collectionName, id) => {
    return getCollectionObject(collectionName, exports.schema).deleteOne({ _id: id });
};
exports.deleteData = deleteData;
var updateOneWithAwait = (model, query, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("model", model);
        let res = yield model.updateOne(query, { $set: Object.assign(Object.assign({}, data), { updatedAt: new Date() }) }, { upsert: false });
        return res;
    }
    catch (error) {
        return error;
    }
});
exports.updateOneWithAwait = updateOneWithAwait;
var updateManyWithAwait = function (model, query, setObj) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("model", model);
            let res = yield model.updateMany(query, { $set: Object.assign(Object.assign({}, setObj), { updatedAt: new Date() }) }, { upsert: false });
            return res;
        }
        catch (error) {
            throw error;
        }
    });
};
exports.updateManyWithAwait = updateManyWithAwait;
var findMany = function (model, query, options, projection, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let resp = yield model
                .find(query, options)
                .project(projection)
                .toArray();
            cb(null, resp);
        }
        catch (error) {
            cb(error, null);
        }
    });
};
exports.findMany = findMany;
var findManyWithAwait = function (model, query, options, projection) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let resp = yield model
                .find(query, options)
                .project(projection)
                .toArray();
            return resp;
        }
        catch (error) {
            return null;
        }
    });
};
exports.findManyWithAwait = findManyWithAwait;
//# sourceMappingURL=dynamicModels.js.map