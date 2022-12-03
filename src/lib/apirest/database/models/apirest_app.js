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


export const apirest_app = dbsequelize.define(
  'apirest_app',
  {
    idapp: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    ts: { type: DataTypes.DATE, defaultValue: NOW },
    rowkey: { type: DataTypes.SMALLINT, defaultValue: 0 },
    idenv: { type: DataTypes.BIGINT, allowNull: false },
    creation_date: { type: DataTypes.DATE, defaultValue: NOW },
    name: { type: DataTypes.TEXT, allowNull: false },
    enabled: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    icon: { type: DataTypes.TEXT },
    author: { type: DataTypes.TEXT },
    email: { type: DataTypes.TEXT },
    description: { type: DataTypes.TEXT }
  },
  {
    freezeTableName: true,
    timestamps: false
  },
)
