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
exports.findByEmailId = exports.find = exports.deleteUser = exports.updateUserByFieldName = exports.updateUserById = exports.CreateUser = exports.createUser = exports.findById = exports.findByUserId = exports.compareSaltedPasswordWithoutCallback = exports.compareSaltedPassword = exports.createSaltedPassword = exports.ROLES = exports.schema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const bson_1 = require("bson");
const getModels_1 = require("../seed/getModels");
const saltRounds = 13;
const Schema = mongoose_1.default.Schema;
exports.schema = new Schema({}, { strict: false, versionKey: false });
var ROLES;
(function (ROLES) {
    ROLES["SUPERADMIN"] = "SUPERADMIN";
    ROLES["ADMIN"] = "ADMIN";
    ROLES["EMPLOYEE"] = "EMPLOYEE";
})(ROLES || (exports.ROLES = ROLES = {}));
// export async function findByUserId(model: any, userId: string, cb: Function) {
//   console.log("userId", userId);
//   let result: any = await model.find({ userId }).toArray();
//   console.log("result in model", result);
//   cb(null, result)
//   return result;
// };
// // Return a salted password the same way that is done for the database.
var createSaltedPassword = function (password, callback) {
    if (password) {
        bcryptjs_1.default.genSalt(saltRounds, function (err, salt) {
            bcryptjs_1.default.hash(password, salt, function (err1, hash) {
                callback(err1, hash);
            });
        });
    }
};
exports.createSaltedPassword = createSaltedPassword;
var compareSaltedPassword = function (password, hash, callback) {
    bcryptjs_1.default.compare(password, hash, function (err, isMatch) {
        callback(err, isMatch);
    });
};
exports.compareSaltedPassword = compareSaltedPassword;
var compareSaltedPasswordWithoutCallback = function (password, hash) {
    return bcryptjs_1.default.compare(password, hash);
};
exports.compareSaltedPasswordWithoutCallback = compareSaltedPasswordWithoutCallback;
var findByUserId = function (model, email, cb) {
    model.findOne({ email }, function (err, User) {
        cb(err, User);
    });
};
exports.findByUserId = findByUserId;
var findById = function (model, id, cb) {
    model.findOne({ _id: new bson_1.ObjectId(id) }, function (err, User) {
        cb(err, User);
    });
};
exports.findById = findById;
var createUser = function (model, UserObj, cb) {
    (0, exports.createSaltedPassword)(UserObj.password, function (err, hashedPassword) {
        if (err) {
            console.log(err);
            return;
        }
        UserObj.password = hashedPassword;
        model.insertMany([UserObj], {}, function (err, User) {
            cb(err, User);
        });
    });
};
exports.createUser = createUser;
function CreateUser(model, UserObj) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            (0, exports.createSaltedPassword)(UserObj.password, (err, hashedPassword) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    console.error(err);
                    return reject(err);
                }
                UserObj.password = hashedPassword;
                UserObj.CreatedAt = new Date();
                UserObj.UpdatedAt = new Date();
                try {
                    const insertedData = yield (0, getModels_1.getCollectionObject)(model, exports.schema).insertMany([UserObj]);
                    resolve(insertedData);
                }
                catch (dbErr) {
                    reject(dbErr);
                }
            }));
        });
    });
}
exports.CreateUser = CreateUser;
var updateUserById = function (model, id, data, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        if (data.password) {
            const password = yield new Promise(function (resolve, reject) {
                (0, exports.createSaltedPassword)(data.password, function (err, hashedPassword) {
                    if (err) {
                        reject(undefined);
                    }
                    resolve(hashedPassword);
                });
            });
            data.password = password;
        }
        data.lastUpdatedAt = Date.now();
        model.updateOne({ _id: new bson_1.ObjectId(id) }, { $set: data }, { upsert: false }, function (err, User) {
            console.log("result", User);
            cb(err);
        });
    });
};
exports.updateUserById = updateUserById;
var updateUserByFieldName = function (model, query, data, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        if (data.password) {
            const password = yield new Promise(function (resolve, reject) {
                (0, exports.createSaltedPassword)(data.password, function (err, hashedPassword) {
                    if (err) {
                        reject(undefined);
                    }
                    resolve(hashedPassword);
                });
            });
            data.password = password;
        }
        data.lastUpdatedAt = Date.now();
        model.updateOne(query, { $set: data }, { upsert: false }, function (err, User) {
            console.log("result", User);
            cb(err);
        });
    });
};
exports.updateUserByFieldName = updateUserByFieldName;
var deleteUser = (model, UserId, cb) => {
    model.deleteOne({ userId: UserId }, (err) => {
        cb(err);
    });
};
exports.deleteUser = deleteUser;
var find = (model, query, projection, options, cb) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let findResult = yield model.find(query, projection).toArray();
        if (findResult) {
            cb(null, findResult);
        }
    }
    catch (error) {
        cb(error, null);
    }
    // model.find(query, projection).exec(function (err, data) {
    //   cb(err, data);
    // });
});
exports.find = find;
function findByEmailId(model, emailId, cb) {
    const collection = (0, getModels_1.getCollectionObject)(model, exports.schema);
    collection.findOne({ email: emailId }, (err, user) => {
        if (err) {
            console.error("Error finding user by email:", err);
            return cb(err, null);
        }
        cb(null, user);
    });
}
exports.findByEmailId = findByEmailId;
//# sourceMappingURL=user.js.map