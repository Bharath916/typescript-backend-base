import mongoose, { Document, Schema, Model } from "mongoose";
import { findJsonInJsonArray, addJson } from "../utils/helper";
import { config } from "../config/config";
import { ObjectId } from "bson";
import { getCollectionObject } from "../seed/getModels";

const Config = new config();

// Token expiry: 30 days in minutes
export const TOKEN_EXPIRY: number = 60 * 24 * 30;

// Generic schema for dynamic collection handling
export const schema = new Schema({}, { strict: false, versionKey: false });

export interface IRefreshToken {
  token: string;
  userType?: string;
  userId: Schema.Types.ObjectId;
  createdAt?: Date;
}

export interface IRefreshTokenModel extends IRefreshToken, Document {}

// ✅ Refresh token schema definition
const RefreshTokenSchema: Schema = new Schema(
  {
    token: { type: String, index: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: "users", index: true },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: TOKEN_EXPIRY * 60, // expiry in seconds
    },
  },
  {
    bufferCommands: false,
    versionKey: false,
  }
);

export const RefreshTokenModel: Model<IRefreshTokenModel> =
  mongoose.models.refreshToken ||
  mongoose.model<IRefreshTokenModel>("refreshToken", RefreshTokenSchema);

// Register model in dynamicModels if not already added
const outcome = findJsonInJsonArray(
  Config.dynamicModels,
  "refreshToken",
  "name"
);
if (!outcome) {
  let obj: any = {};
  addJson(obj, "name", "refreshToken");
  addJson(obj, "model", RefreshTokenModel);
  Config.dynamicModels.push(obj);
}

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

  const collection =
    mongoose.models[model] || getCollectionObject(model, schema);

  collection.insertMany([tokenObj], {}, function (err: any, result: any) {
    if (err) {
      console.error("Error inserting refresh token:", err);
      return cb(err, null);
    }

    cb(null, result);
  });
};

export const findByToken = function (model: any, token: string, cb: Function) {
  model.findOne({ token }, function (err: any, result: any) {
    cb(err, result);
  });
};

export const deleteToken = function (model: any, userId: any, cb: Function) {
  userId = new ObjectId(userId);
  model.deleteOne({ userId }, function (err: any) {
    cb(err);
  });
};
