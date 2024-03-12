require("dotenv").config();

export class config {
  serviceName = process.env.SERVICE || "INSUREDMINE_ASSESSMENT";
  mongodbURI =
    process.env.MONGO_DB_URI ||
    "mongodb://localhost:27017/insuredmineAssessment";
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
  };
  static serviceName: string;
  static mongodbURI: string;
  static port: number;
  static availableCollection: any;
  static dynamicModels: any;
}
