"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionList = exports.config = void 0;
require("dotenv").config();
class config {
    constructor() {
        this.serviceName = process.env.SERVICE || "CONVENTION_HALL";
        this.mongodbURI = process.env.MONGO_DB_URI ||
            "mongodb+srv://bharath:%21%40%23Bharath790@cluster0.v9fdrlb.mongodb.net/conventionHall?retryWrites=true&w=majority";
        this.port = process.env.PORT || 9090;
        this.dynamicModels = new Array();
        this.availableCollection = {
            agent: "agent",
            user: "user",
            usersAccount: "usersAccount",
            policyCategory: "policyCategory",
            policyCarrier: "policyCarrier",
            policyInfo: "policyInfo",
            messageAlert: "messageAlert",
            accessToken: "accessToken",
            refreshToken: "refreshToken",
        };
    }
}
exports.config = config;
class CollectionList {
    constructor() {
        this.getCollection = {};
        this.dbname = "";
    }
    CollectionList() {
        CollectionList.collectionList = this;
    }
    static getInstance() {
        if (!CollectionList.collectionList) {
            CollectionList.collectionList = new CollectionList();
        }
        return CollectionList.collectionList;
    }
}
exports.CollectionList = CollectionList;
//# sourceMappingURL=config.js.map