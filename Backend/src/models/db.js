"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
require("dotenv").config();
const mongoose_1 = __importDefault(require("mongoose"));
class DB {
    getDB() {
        return DB.db;
    }
    connectWithRetry(uriString) {
        let Mongoose = mongoose_1.default.connect(uriString, {
            autoIndex: true,
            // bufferMaxEntries: 0,
            // useCreateIndex: true,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            // useCreateIndex: true,
        });
        (err) => {
            if (err) {
                console.log("Mongoose failed initials connection. Retrying in 5 seconds...");
                setTimeout(() => {
                    this.connectWithRetry(uriString);
                }, 5000);
            }
            else {
                mongoose_1.default.Promise = global.Promise;
                DB.db = mongoose_1.default.connection;
            }
        };
        return Mongoose;
    }
    connctionClose(callback) {
        mongoose_1.default.connection.close(function () {
            console.log("Mongoose connection closed.");
            if (callback) {
                callback();
            }
        });
    }
}
exports.DB = DB;
mongoose_1.default.connection.on("error", function (err) {
    console.log("Mongoose error:", +err);
});
mongoose_1.default.connection.on("connected", function () {
    console.log("Mongoose connected");
});
mongoose_1.default.connection.on("disconnected", function () {
    console.log("Mongoose disconnected");
});
//# sourceMappingURL=db.js.map