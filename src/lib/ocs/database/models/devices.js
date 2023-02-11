import { DataTypes, NOW } from 'sequelize'
import dbsequelize from '../sequelize.js'
import { enum_devices_status } from './enum_devices_status.js'

export const device = dbsequelize.define(
  'devices',
  {
    iddevice: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    ts: { type: DataTypes.DATE, defaultValue: NOW },
    rowkey: { type: DataTypes.SMALLINT, defaultValue: 0 },
    uuid: { type: DataTypes.UUID, allowNull: false, unique: true },
    name: { type: DataTypes.TEXT },
    last_connection: { type: DataTypes.DATE },
    chip_model: { type: DataTypes.TEXT },
    latitude: { type: DataTypes.DECIMAL, defaultValue: 0 },
    longitude: { type: DataTypes.DECIMAL, defaultValue: 0 },
    iddevicestatus: {
      type: DataTypes.SMALLINT,
    },
    allow_activation_by_geolocation: {type: DataTypes.BOOLEAN, defaultValue: false}
  },
  {
    freezeTableName: true,
    timestamps: false
  },
)

enum_devices_status.hasMany(device, {
  foreignKey: 'iddevicestatus',
  sourceKey: 'iddevicestatus',
})
