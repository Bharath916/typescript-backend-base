import mongoose, { Document, Model, Schema } from "mongoose";
import { findJsonInJsonArray, addJson } from "../utils/helper";
import { config } from "../config/config";
import { ObjectId } from "bson";
import { getCollectionObject } from "../seed/getModels";

const Config = new config();

// Token expiry: 6 hours
export const TOKEN_EXPIRY: number = 60 * 60 * 6;

export interface IAccessToken {
  token: string;
  userId: Schema.Types.ObjectId;
  createdAt?: Date;
}

export interface IAccessTokenModel extends IAccessToken, Document {}

// Define schema
const AccessTokenSchema: Schema = new Schema(
  {
    token: { type: String, index: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: "users", index: true },
    createdAt: { type: Date, default: Date.now, expires: TOKEN_EXPIRY },
  },
  {
    bufferCommands: false,
    versionKey: false,
  }
);

// ✅ Avoid OverwriteModelError
export const AccessTokenModel: Model<IAccessTokenModel> =
  mongoose.models.accessToken ||
  mongoose.model<IAccessTokenModel>("accessToken", AccessTokenSchema);

// Register in dynamicModels if not already added
const outcome = findJsonInJsonArray(
  Config.dynamicModels,
  "accessToken",
  "name"
);
if (!outcome) {
  let obj: any = {};
  addJson(obj, "name", "accessToken");
  addJson(obj, "model", AccessTokenModel);
  Config.dynamicModels.push(obj);
}

// ✅ Update token (callback style)
export const updateToken = function (
  model: string,
  token: string,
  userId: string,
  cb: Function
) {
  const tokenObj = {
    token,
    userId: new ObjectId(userId),
    CreatedAt: new Date(),
    UpdatedAt: new Date(),
  };

  // ✅ getCollectionObject should also avoid overwriting models
  const collection =
    mongoose.models[model] ||
    getCollectionObject(model, new Schema({}, { strict: false }));

  collection.insertMany([tokenObj], {}, function (err: any, result: any) {
    if (err) {
      console.error("Error inserting token:", err);
      return cb(err, null);
    }

    cb(null, result);
  });
};

// ✅ Find by token
export const findByToken = function (model: any, token: string, cb: Function) {
  model.findOne({ token }, function (err: any, result: any) {
    cb(err, result);
  });
};

// ✅ Delete token
export const deleteToken = function (model: any, userId: any, cb: Function) {
  userId = new ObjectId(userId);
  model.deleteMany({ userId }, {}, (err: any, result: any) => {
    console.log("Deleted:", result);
    cb(err);
  });
};
