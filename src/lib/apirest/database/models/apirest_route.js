import { DataTypes, NOW } from 'sequelize'
import dbsequelize from '../sequelize.js'
/*
   "description": "La version no es editable",
          "route": "demopath",
          "enabled": true,
          */


export const apirest_route = dbsequelize.define(
  'apirest_route',
  {
    idroute: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    ts: { type: DataTypes.DATE, defaultValue: NOW },
    rowkey: { type: DataTypes.SMALLINT, defaultValue: 0 },
    idapp: { type: DataTypes.BIGINT, allowNull: false },
    creation_date: { type: DataTypes.DATE, defaultValue: NOW },
    route: { type: DataTypes.TEXT, allowNull: false },
    enabled: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
  },
  {
    freezeTableName: true,
    timestamps: false
  },
)
