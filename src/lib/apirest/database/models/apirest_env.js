import { DataTypes, NOW } from 'sequelize'
import dbsequelize from '../sequelize.js'
/*
    "description": "My App Demo",
      "icon": "icon.png",
      "app": "demo",
      "author": "My Company",
      "email": "edwinspire@gmail.com",
      "enabled": true,
      "createionDate": "2016-01-01T00:00:00.000Z",
      "lastUpdate": "2016-01-01T00:00:00.000Z",
*/


export const apirest_env = dbsequelize.define(
  'apirest_env',
  {
    idenv: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    ts: { type: DataTypes.DATE, defaultValue: NOW },
    rowkey: { type: DataTypes.SMALLINT, defaultValue: 0 },
    name: { type: DataTypes.TEXT, allowNull: false, unique: true },
    description: { type: DataTypes.TEXT }
  },
  {
    freezeTableName: true,
    timestamps: false
  },
)
