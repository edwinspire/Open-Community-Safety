import { DataTypes, NOW } from 'sequelize'
import dbsequelize from '../sequelize.js'

export const enum_input_type = dbsequelize.define(
  'enum_input_types',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
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
