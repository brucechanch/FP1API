const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Request', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    template: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    note: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Requests',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Requests_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
