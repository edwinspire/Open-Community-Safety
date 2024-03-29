import { DataTypes, NOW } from 'sequelize'
import dbsequelize from '../sequelize.js'
import { tbl_with_prefix } from "./utils.js";

export const telegram_groups = dbsequelize.define(
  tbl_with_prefix( 'telegram_groups'),
  {
    idtg: {
      type: DataTypes.UUID,
      primaryKey: true, allowNull: false
    },
    rowkey: { type: DataTypes.SMALLINT, defaultValue: 0 },
    enabled: { type: DataTypes.BOOLEAN, defaultValue: true },
    group: { type: DataTypes.BIGINT, unique: true, allowNull: false },
    name: { type: DataTypes.TEXT, allowNull: true },
    latitude: { type: DataTypes.DECIMAL, defaultValue: 0, allowNull: true },
    longitude: { type: DataTypes.DECIMAL, defaultValue: 0, allowNull: true },
    allow_community_use: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: true }
  },
  {
    freezeTableName: true
  },
)
