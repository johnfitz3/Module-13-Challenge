const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Product = require('./Product');

class ProductTag extends Model {}

ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Product, // <- Replace `product` with `Product`
        key: 'id' // <- Add quotes around 'id'
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Product, // <- Replace `product` with `Product`
        key: 'id' // <- Add quotes around 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag'
  }
);

module.exports = ProductTag;
