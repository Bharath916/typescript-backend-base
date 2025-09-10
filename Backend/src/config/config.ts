require("dotenv").config();

export class config {
  serviceName = process.env.SERVICE || "CONVENTION_HALL";
  mongodbURI =
    process.env.MONGO_DB_URI || "mongodb://localhost:27017/conventionHall";
  port = process.env.PORT || 9090;
  dynamicModels = new Array();
  availableCollection = {
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
  static serviceName: string;
  static mongodbURI: string;
  static port: number;
  static availableCollection: any;
  static dynamicModels: any;
}
export class CollectionList {
  private static collectionList: CollectionList;
  getCollection = {};
  dbname: any = "";

  private CollectionList() {
    CollectionList.collectionList = this;
  }
  static getInstance() {
    if (!CollectionList.collectionList) {
      CollectionList.collectionList = new CollectionList();
    }
    return CollectionList.collectionList;
  }
}
