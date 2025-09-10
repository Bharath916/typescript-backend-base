"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBody = exports.isDateValid = exports.isCollectionEmpty = exports.getDateFromObjectId = exports.getObjectIdFromDate = exports.generatePassword = exports.generateTransactionId = exports.typeOfData = exports.addJson = exports.findJsonInJsonArray = void 0;
const uniqid_1 = __importDefault(require("uniqid"));
const constants_1 = require("./constants");
function findJsonInJsonArray(list, value, keyToSearch) {
    list.forEach((element) => {
        if (element[keyToSearch] === value) {
            return true;
        }
    });
    return false;
}
exports.findJsonInJsonArray = findJsonInJsonArray;
function addJson(obj, key, value) {
    obj[key] = value;
    return obj;
}
exports.addJson = addJson;
function typeOfData(data) {
    if (typeof data === "object") {
        if (Array.isArray(data)) {
            return constants_1.CONSTANTS.DATA_TYPE.array;
        }
        else {
            return constants_1.CONSTANTS.DATA_TYPE.object;
        }
    }
    else {
        return constants_1.CONSTANTS.DATA_TYPE.value;
    }
}
exports.typeOfData = typeOfData;
function generateTransactionId() {
    return (0, uniqid_1.default)("tx");
}
exports.generateTransactionId = generateTransactionId;
function generatePassword() {
    var pass = "";
    var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789@#$";
    for (let i = 1; i <= 10; i++) {
        var char = Math.floor(Math.random() * str.length + 1);
        pass += str.charAt(char);
    }
    return pass;
}
exports.generatePassword = generatePassword;
function getObjectIdFromDate(date) {
    let objectId = Math.floor(date.getTime() / 1000).toString(16) + "0000000000000000";
    return objectId;
}
exports.getObjectIdFromDate = getObjectIdFromDate;
function getDateFromObjectId(objectId) {
    return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
}
exports.getDateFromObjectId = getDateFromObjectId;
function isCollectionEmpty(collectionName) {
    if (!collectionName || collectionName.length == 0) {
        return true;
    }
    return false;
}
exports.isCollectionEmpty = isCollectionEmpty;
function isDateValid(date) {
    if (date instanceof Date && !isNaN(date.valueOf())) {
        return true;
    }
    return false;
}
exports.isDateValid = isDateValid;
function checkBody(input, keys) {
    let isArray = function (a) {
        return !!a && a.constructor === Array;
    };
    let isObject = function (a) {
        return !!a && a.constructor === Object;
    };
    if (isArray(keys)) {
        if (isArray(input)) {
            let array = input;
            return array.every((o) => {
                return (isObject(o) &&
                    keys.every((k) => {
                        return Object.keys(o).includes(k);
                    }));
            });
        }
        else if (isObject(input)) {
            return keys.every((k) => {
                return Object.keys(input).includes(k);
            });
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}
exports.checkBody = checkBody;
//# sourceMappingURL=helper.js.map