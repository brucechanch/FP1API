const { Model } = require('sequelize')
const RequestSchema = require('./schema/request')
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    static associate(models) {
      Request.User = this.belongsTo(models.User)
    }
  }

  const { tableAttributes } = RequestSchema(sequelize, DataTypes)
  Request.init(tableAttributes, {
    sequelize,
    modelName: 'Request',
  })
  return Request
}