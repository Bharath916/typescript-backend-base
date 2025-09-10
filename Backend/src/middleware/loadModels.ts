const { User } = require("./models/User");
const { Order } = require("./models/Order");

module.exports = (req, res, next) => {
  req.model = {
    User,
    Order,
  };
  next();
};
