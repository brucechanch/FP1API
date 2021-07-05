var DataTypes = require("sequelize").DataTypes;
var _Request = require("./request");
var _SequelizeMetum = require("./sequelize_metum");
var _User = require("./user");

function initModels(sequelize) {
  var Request = _Request(sequelize, DataTypes);
  var SequelizeMetum = _SequelizeMetum(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);


  return {
    Request,
    SequelizeMetum,
    User,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
