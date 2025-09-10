import mongoose, { Document, Model, model, Mongoose } from "mongoose";
import bcrypt from "bcryptjs";
import { ObjectId } from "bson";
import { getCollectionObject } from "../seed/getModels";
const saltRounds = 13;

const Schema = mongoose.Schema;
export let schema = new Schema({}, { strict: false, versionKey: false });

export enum ROLES {
  SUPERADMIN = "SUPERADMIN",
  ADMIN = "ADMIN",
  EMPLOYEE = "EMPLOYEE",
}

export interface User {
  name: string;
  userId: string;
  phone: string;
  password: string;
  oldPasswords: [string];
  roles: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// export async function findByUserId(model: any, userId: string, cb: Function) {
//   console.log("userId", userId);

//   let result: any = await model.find({ userId }).toArray();

//   console.log("result in model", result);

//   cb(null, result)

//   return result;
// };

// // Return a salted password the same way that is done for the database.
export var createSaltedPassword = function (
  password: string,
  callback: Function
) {
  if (password) {
    bcrypt.genSalt(saltRounds, function (err, salt: any) {
      bcrypt.hash(password, salt, function (err1, hash) {
        callback(err1, hash);
      });
    });
  }
};

export var compareSaltedPassword = function (
  password: string,
  hash: string,
  callback: Function
) {
  bcrypt.compare(password, hash, function (err, isMatch) {
    callback(err, isMatch);
  });
};
export var compareSaltedPasswordWithoutCallback = function (
  password: string,
  hash: string
) {
  return bcrypt.compare(password, hash);
};

export var findByUserId = function (model: any, email: string, cb: Function) {
  model.findOne({ email }, function (err, User) {
    cb(err, User);
  });
};

export var findById = function (model: any, id: any, cb: Function) {
  model.findOne({ _id: new ObjectId(id) }, function (err, User) {
    cb(err, User);
  });
};

export var createUser = function (model: any, UserObj: any, cb: Function) {
  createSaltedPassword(UserObj.password, function (err, hashedPassword) {
    if (err) {
      console.log(err);
      return;
    }

    UserObj.password = hashedPassword;
    model.insertMany([UserObj], {}, function (err: any, User: any) {
      cb(err, User);
    });
  });
};

export async function CreateUser(model: string, UserObj: any) {
  return new Promise((resolve, reject) => {
    createSaltedPassword(UserObj.password, async (err, hashedPassword) => {
      if (err) {
        console.error(err);
        return reject(err);
      }

      UserObj.password = hashedPassword;
      UserObj.CreatedAt = new Date();
      UserObj.UpdatedAt = new Date();

      try {
        const insertedData = await getCollectionObject(
          model,
          schema
        ).insertMany([UserObj]);
        resolve(insertedData);
      } catch (dbErr) {
        reject(dbErr);
      }
    });
  });
}

export var updateUserById = async function (
  model: any,
  id: any,
  data: any,
  cb: Function
) {
  if (data.password) {
    const password = await new Promise(function (resolve, reject) {
      createSaltedPassword(data.password, function (err, hashedPassword) {
        if (err) {
          reject(undefined);
        }
        resolve(hashedPassword);
      });
    });
    data.password = password;
  }

  data.lastUpdatedAt = Date.now();

  model.updateOne(
    { _id: new ObjectId(id) },
    { $set: data },
    { upsert: false },
    function (err, User) {
      console.log("result", User);

      cb(err);
    }
  );
};

export var updateUserByFieldName = async function (
  model: any,
  query: any,
  data: any,
  cb: Function
) {
  if (data.password) {
    const password = await new Promise(function (resolve, reject) {
      createSaltedPassword(data.password, function (err, hashedPassword) {
        if (err) {
          reject(undefined);
        }
        resolve(hashedPassword);
      });
    });
    data.password = password;
  }

  data.lastUpdatedAt = Date.now();

  model.updateOne(
    query,
    { $set: data },
    { upsert: false },
    function (err, User) {
      console.log("result", User);

      cb(err);
    }
  );
};

export var deleteUser = (model: any, UserId: string, cb: Function) => {
  model.deleteOne({ userId: UserId }, (err) => {
    cb(err);
  });
};

export var find = async (
  model: any,
  query: any,
  projection: any,
  options: any,
  cb: Function
) => {
  try {
    let findResult: any = await model.find(query, projection).toArray();

    if (findResult) {
      cb(null, findResult);
    }
  } catch (error) {
    cb(error, null);
  }

  // model.find(query, projection).exec(function (err, data) {
  //   cb(err, data);
  // });
};

export function findByEmailId(model: string, emailId: string, cb: Function) {
  const collection = getCollectionObject(model, schema);

  collection.findOne({ email: emailId }, (err: any, user: any) => {
    if (err) {
      console.error("Error finding user by email:", err);
      return cb(err, null);
    }
    cb(null, user);
  });
}
