"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollectionObject = void 0;
const mongoose = require("mongoose");
const config_1 = require("../config/config");
const Config = new config_1.config();
function getCollectionObject(collectionName, Schema) {
    let collectionExists = false;
    let collection = {};
    try {
        for (var i = 0; i < Config.dynamicModels.length; i++) {
            if (Config.dynamicModels[i]["name"] === collectionName) {
                collection = Config.dynamicModels[i];
                collectionExists = true;
                break;
            }
        }
        if (!collectionExists) {
            collection["name"] = collectionName;
            collection["model"] = mongoose.model(collectionName, Schema, collectionName);
            Config.dynamicModels.push(collection);
        }
    }
    catch (error) {
        console.log("error", error);
    }
    return collection["model"];
}
exports.getCollectionObject = getCollectionObject;
//# sourceMappingURL=getModels.js.map