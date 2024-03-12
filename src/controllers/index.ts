import { Request, Response, NextFunction } from "express";
import { ErrorCodes } from "../models/models";
import * as DynamicModel from "../models/dynamicModels";
import { config } from "../config/config";
const multer = require("multer");
const XLSX = require("xlsx");

const Config = new config();
//Add logic
export async function createData(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  try {
    let collectionName: any = Config.availableCollection.agent;
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
    let addRecord = await DynamicModel.add(collectionName, newRecord);

    if (addRecord) {
      res.json({
        isSuccess: true,
        data: "Added successfully",
      });

      next();
    } else {
      res.json({
        isSuccess: false,
        error: ErrorCodes[1001],
        data: {},
      });
      next();
      return;
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

//getData
export async function getData(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  try {
    let collectionName = Config.availableCollection.agent;

    if (!collectionName) {
      res.json({
        isSuccess: false,
        error: ErrorCodes[1001],
        data: {},
      }),
        next();
      return;
    }
    let findData = await DynamicModel.getData(collectionName, {}, {}, {});
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
  } catch (error) {
    res.json({
      isSuccess: false,
      error: ErrorCodes[1004],
      customMsg: "FAILED TO FETCH DATA",
      data: {},
    }),
      next();
    return;
  }
}

//getOne data
export async function getOneData(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  try {
    let collectionName: any = Config.availableCollection.agent;
    let id: any = req.params.id;

    if (!collectionName && !id) {
      res.json({
        isSuccess: false,
        error: ErrorCodes[1001],
        customMsg: "Missing collection name || id",
        data: {},
      });
      next();
      return;
    }

    let getOneDataById = await DynamicModel.GetfindOne(collectionName, id);
    if (getOneDataById) {
      res.json({
        isSuccess: true,
        customMsg: "DATA FETCH SUCCESSFULL",
        data: getOneDataById,
      });
      next();
      return;
    } else {
      res.json({
        isSuccess: false,
        error: ErrorCodes[1004],
        customMsg: "FAILED TO FETCH DATA",
        data: {},
      });
      next();
      return;
    }
  } catch (error) {
    res.json({
      isSuccess: false,
      error: ErrorCodes[1004],
      customMsg: "FAILED TO FETCH DATA 2222",
      data: {},
    });
    next();
    return;
  }
}

//update functionality
export async function UpdateData(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  try {
    let collectionName: any = Config.availableCollection.agent;
    let id: any = req.params.id;
    let body: any = req.body;

    if (!collectionName && !id && !body) {
      res.json({
        isSuccess: false,
        error: ErrorCodes[1001],
        customMsg: "Missing collection name || new record",
        data: {},
      }),
        next();
      return;
    }

    let updatedData = await DynamicModel.updateData(collectionName, id, body);

    if (updatedData) {
      res.json({
        isSuccess: true,
        customMsg: "DATA UPDATE SUCCESSFULLY",
        data: {},
      });
      next();
    } else {
      res.json({
        isSuccess: false,
        error: ErrorCodes[1007],
        customMsg: "FAILED TO UPDATE DATA",
        data: {},
      });
      next();
      return;
    }
  } catch (error) {
    res.json({
      isSuccess: false,
      error: ErrorCodes[1007],
      customMsg: "FAILED TO UPDATE DATA",
      data: {},
    });
    next();
    return;
  }
}

//delete record
export async function deleteData(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  try {
    let collectionName: any = Config.availableCollection.agent;
    let id: any = req.params.id;

    if (!collectionName && !id) {
      res.json({
        isSuccess: false,
        error: ErrorCodes[1001],
        customMsg: "Missing collection name || new record",
        data: {},
      });
      next();
      return;
    }

    let deleteRecord = await DynamicModel.deleteData(collectionName, id);
    // console.log("deleteRecord", deleteRecord);
    if (deleteRecord) {
      res.json({
        isSuccess: true,
        customMsg: "DATA DELETE SUCCESSFULL",
        data: {},
      });
      next();
    } else {
      res.json({
        isSuccess: false,
        error: ErrorCodes[1005],
        customMsg: "FAILED TO DELETE DATA 232323",
        data: {},
      });
      next();
      return;
    }
  } catch (error) {
    res.json({
      isSuccess: false,
      error: ErrorCodes[1008],
      customMsg: "FAILED TO DELETE DATA",
      data: {},
    });
    next();
    return;
  }
}

//bulk uploading data
export async function bulkData(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  try {
    const fileLocation = req.file.path;
    //   console.log("location",fileLocation);
    var workbook = XLSX.readFile(fileLocation);
    var sheet_name_list = workbook.SheetNames;
    //   console.log("sheet_name_list",sheet_name_list);
    var JsonResult = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheet_name_list[0]]
    );
    // let getpolicyInfo: any;
    let insertedUser: any;

    const promises = JsonResult?.map(async (obj: any) => {
      const promises1: any = [];

      if (obj?.agent) {
        promises1.push(
          DynamicModel.add(Config.availableCollection.agent, {
            agent: obj?.agent,
            createdAt: new Date(),
          })
        );
      }

      if (obj?.account_name) {
        promises1.push(
          DynamicModel.add(Config.availableCollection.usersAccount, {
            account_name: obj?.account_name,
            createdAt: new Date(),
          })
        );
      }

      if (obj?.category_name) {
        promises1.push(
          DynamicModel.add(Config.availableCollection.policyCategory, {
            // userId: String(insertedUser[0]._id),
            category_name: obj?.category_name,
            createdAt: new Date(),
          })
        );
      }

      if (obj?.company_name) {
        promises1.push(
          DynamicModel.add(Config.availableCollection.policyCarrier, {
            company_name: obj?.company_name,
            createdAt: new Date(),
          })
        );
      }
      if (
        obj?.firstname &&
        obj?.dob &&
        obj?.address &&
        obj?.phone &&
        obj?.state &&
        obj?.zip &&
        obj?.email &&
        obj?.userType
      ) {
        const insertedUserData = await DynamicModel.add(
          Config.availableCollection.user,
          {
            firstname: obj?.firstname,
            dob: obj?.dob,
            address: obj?.address,
            phone: obj?.phone,
            state: obj?.state,
            zip: obj?.zip,
            email: obj?.email,
            usertype: obj?.userType,
            createdAt: new Date(),
          }
        );
        promises1.push(insertedUserData);
        insertedUser = [...insertedUserData];
      }
      if (
        obj?.policy_number &&
        obj?.policy_start_date &&
        obj?.policy_end_date &&
        obj?.category_name &&
        insertedUser &&
        insertedUser.length > 0
      ) {
        promises1.push(
          DynamicModel.add(Config.availableCollection.policyInfo, {
            userId: String(insertedUser[0]._id),
            policy_number: obj?.policy_number,
            policy_start_date: obj?.policy_start_date,
            policy_end_date: obj?.policy_end_date,
            category_name: obj?.category_name,
            createdAt: new Date(),
          })
        );
      }

      return Promise.all(promises1);
    });

    try {
      await Promise.all(promises);
      // console.log("All database operations completed successfully.");
      res.json({
        data: "All database operations completed successfully.",
      });
    } catch (error) {
      console.error("Error occurred during database operations:", error);
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to add agent",
      error: error.message,
    });
  }
}

//search API using userName
export async function searchByUserName(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  try {
    let collectionName: any = Config.availableCollection.policyInfo;
    let id: any = req.params.id;

    let findPolicyInfo: any = await DynamicModel.findOne(collectionName, id);
    if (findPolicyInfo) {
      res.json({
        data: findPolicyInfo,
      });
    } else {
      res.json({
        data: "failed to get data",
      });
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
}

//aggregated policy by each user
export async function aggregatedPolicyWithUser(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  try {
    let collectionName: any = Config.availableCollection.policyInfo;
    let aggrQuery: any = [
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
    let aggregatedResult: any = await DynamicModel.aggregateAwait(
      collectionName,
      aggrQuery
    );

    if (aggregatedResult && aggregatedResult.length) {
      res.json({
        data: aggregatedResult,
      });
    } else {
      res.json({
        data: "Failed to aggregate data",
      });
    }
  } catch (error) {
    res.json(error);
  }
}

//add messageAlert and store it into DB
export async function messageAlert(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  try {
    let collectionName: any = Config.availableCollection.messageAlert;
    let body: any = req.body;
    body["createdAt"] = new Date();

    if (!collectionName || !body) {
      res.json({
        isSuccess: false,
        customMsg: "Missing collection name || body",
      });
      next();
      return;
    }
    let addMessage: any = await DynamicModel.add(collectionName, body);
    if (addMessage) {
      res.json({
        isSuccess: true,
        data: "Added successfully",
      });
    }
  } catch (error) {
    res.json(error);
  }
}
