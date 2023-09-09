import { DataTypes, NOW } from 'sequelize'
import dbsequelize from '../sequelize.js'
import { enum_devices_status } from './enum_devices_status.js'
import { tbl_with_prefix } from "./utils.js";

export const device = dbsequelize.define(
  tbl_with_prefix('devices'),
  {
    uuid: { type: DataTypes.UUID, allowNull: false, unique: true, primaryKey: true },
    rowkey: { type: DataTypes.SMALLINT, defaultValue: 0 },
    name: { type: DataTypes.TEXT },
    last_connection: { type: DataTypes.DATE },
    chip: { type: DataTypes.TEXT },
    chip_model: { type: DataTypes.TEXT },
    chip_version: { type: DataTypes.TEXT },
    latitude: { type: DataTypes.DECIMAL, defaultValue: 0 },
    longitude: { type: DataTypes.DECIMAL, defaultValue: 0 },
    iddevicestatus: {
      type: DataTypes.SMALLINT,
    },
    allow_activation_by_geolocation: { type: DataTypes.BOOLEAN, defaultValue: false }
  },
  {
    freezeTableName: true,
  },
)

enum_devices_status.hasMany(device, {
  foreignKey: 'iddevicestatus',
  sourceKey: 'iddevicestatus',
})


