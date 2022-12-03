import { DataTypes, NOW } from 'sequelize'
import dbsequelize from '../sequelize.js'
/*
  
              "description": "La version no es editable",
              "examples": [
                {
                  "description": "Ejemplo 1",
                  "payload": "{}",
                  "enable_test": true
                }
              ],
              "method": "GET",
              "isPublic": true,
              "handler": {
                "name": "jsFunction",
                "code": "RETURN_DATA = {funciona: 'mundo funciona bien'};"
              },
              "version": 1,
              "enabled": true,
              "createionDate": "2016-01-01T00:00:00.000Z"
          */

export const apirest_method = dbsequelize.define(
  'apirest_method',
  {
    idmethod: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    ts: { type: DataTypes.DATE, defaultValue: NOW },
    rowkey: { type: DataTypes.SMALLINT, defaultValue: 0 },
    idroute: { type: DataTypes.BIGINT, allowNull: false },
    creation_date: { type: DataTypes.DATE, defaultValue: NOW },
    method: { type: DataTypes.TEXT, allowNull: false },
    enabled: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    is_public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    version: { type: DataTypes.INTEGER },
    description: { type: DataTypes.TEXT },
    handler: { type: DataTypes.TEXT, allowNull: false },
    code: { type: DataTypes.TEXT },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
)
