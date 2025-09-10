import { Request, Response, NextFunction } from "express";
import { ErrorCodes, ResponseObj } from "../../models/models";
import * as DynamicModel from "../../models/dynamicModels";
import { config } from "../../config/config";
import * as Users from "../../models/user";
import * as AccessToken from "../../models/accesstoken";
import * as RefreshToken from "../../models/refreshtoken";
import jwt from "jsonwebtoken";
import moment from "moment";

const multer = require("multer");
const XLSX = require("xlsx");
const Config = new config();

//user Registration logic
export async function createUserRegister(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  try {
    let collectionName: any = Config.availableCollection.user;
    let newRecord = req.body;

    if (!collectionName || !newRecord) {
      res.json({
        isSuccess: false,
        error: ErrorCodes[1001],
        customMsg: "Missing collection name || new record",
        data: {},
      });
      next();
      return;
    }

    let addData: any = await Users.CreateUser(collectionName, newRecord);

    if (addData) {
      res.send({
        isSuccess: true,
        data: "added successfully",
      });
    } else {
      res.send({
        isSuccess: false,
        error: ErrorCodes[1003],
        customMsg: "failed to add data",
      });
    }
  } catch (error) {
    req.apiStatus = {
      isSuccess: false,
      error: ErrorCodes[1002],
      customMsg: "Failed to add data",
      data: {},
    };
    next();
    return;
  }
}

//login functionality

export function login(req: any, res: any) {
  if (req.body && req.body.email && req.body.password) {
    var username = req.body.email;
    var password = req.body.password;

    Users.findByEmailId(
      Config.availableCollection.user,
      username,
      function (err: Error, user: any) {
        if (err || !user) {
          let responseObj = new ResponseObj(
            404,
            "Incorrect username or password ",
            undefined
          );
          res.status(responseObj.status).json(responseObj);
          return;
        } else {
          Users.compareSaltedPassword(
            password,
            user.password,
            function (pwdErr: Error, isMatch: boolean) {
              if (isMatch) {
                let userJson: any = JSON.stringify(user);
                userJson = JSON.parse(userJson);

                generateAndSaveAccessToken(
                  req,
                  userJson,
                  function (accessToken: string, expiresAt: Date) {
                    if (!accessToken || !expiresAt) {
                      let responseObj = new ResponseObj(
                        500,
                        "Internal Error",
                        null
                      );
                      res.status(responseObj.status).json(responseObj);
                      return;
                    }

                    generateAndSaveRefreshToken(
                      req,
                      userJson,
                      function (refreshToken: string, refreshExpiredAt: Date) {
                        if (!refreshToken || !expiresAt) {
                          let responseObj = new ResponseObj(
                            500,
                            "Internal Error",
                            null
                          );
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

                        let responseObj = new ResponseObj(
                          200,
                          "Success",
                          userJson
                        );
                        res.status(responseObj.status).json(responseObj);
                      }
                    );
                  }
                );
              } else {
                let responseObj = new ResponseObj(
                  400,
                  "Incorrect username or password ",
                  undefined
                );
                res.status(responseObj.status).json(responseObj);
              }
            }
          );
        }
      }
    );
  }
}

// /************** Helper Functions ******************/
const jwtSecret = "J434dgeBPTsd5GsdGORD91C";
function generateAndSaveAccessToken(req: any, user: any, cb: Function) {
  let token = jwt.sign({ email: user.email }, jwtSecret, {
    expiresIn: AccessToken.TOKEN_EXPIRY * 60,
  });

  AccessToken.updateToken(
    // req.model[config.availableCollections.accesstokens],
    Config.availableCollection.accessToken,
    token,
    user._id,
    // req.query.orgCode, // added as extra param after implementation of multiple db
    function (err: Error, result: any) {
      if (err || !result) {
        // logger.error(req.txId, "Error saving token: " + err);
        cb(null, null);
      } else {
        // logger.verbose(req.txId, "Access Token details: " + result);
        let expiresAt = moment(result.createdAt)
          .add(AccessToken.TOKEN_EXPIRY, "m")
          .utc();
        cb(token, expiresAt);
      }
    }
  );
}

function generateAndSaveRefreshToken(req: any, user: any, cb: Function) {
  let token: any = jwt.sign({ email: user.email }, jwtSecret, {
    expiresIn: RefreshToken.TOKEN_EXPIRY * 60,
  });

  RefreshToken.updateToken(
    Config.availableCollection.refreshToken,
    token,
    user._id,
    function (err: Error, result: any) {
      if (err || !result) {
        // logger.error(req.txId, "Error saving token: " + err);
        cb(null, null);
      } else {
        // logger.verbose(req.txId, "Refresh Token details: " + result);
        let expiresAt = moment(result.createdAt)
          .add(RefreshToken.TOKEN_EXPIRY, "m")
          .utc();
        cb(token, expiresAt);
      }
    }
  );
}
