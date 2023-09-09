import { DataTypes, NOW } from 'sequelize'
import dbsequelize from '../sequelize.js'
import { tbl_with_prefix } from "./utils.js";


export const enum_devices_status = dbsequelize.define(
  tbl_with_prefix( 'enum_devices_status'),
  {
    iddevicestatus: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    ts: { type: DataTypes.DATE, defaultValue: NOW },
    rowkey: { type: DataTypes.SMALLINT, defaultValue: 0 },
    label: { type: DataTypes.TEXT, unique: true, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    freezeTableName: true,
    timestamps: false
  },
)
