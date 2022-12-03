import { DataTypes, NOW } from 'sequelize'
import dbsequelize from '../sequelize.js'

export const pruebas = dbsequelize.define(
  'pruebas',
  {
    iddevice: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    ts: { type: DataTypes.DATE, defaultValue: NOW },
    rowkey: { type: DataTypes.SMALLINT, defaultValue: 0 },
    uuid: { type: DataTypes.UUID, allowNull: false, unique: true },
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
