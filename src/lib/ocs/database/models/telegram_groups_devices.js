import { DataTypes, NOW } from 'sequelize'
import dbsequelize from '../sequelize.js'
import { device } from './devices.js'
import { telegram_groups } from './telegram_groups.js'
import { tbl_with_prefix } from "./utils.js";

export const telegram_groups_devices = dbsequelize.define(
  tbl_with_prefix( 'telegram_groups_devices'),
  {
    idtgd: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    ts: { type: DataTypes.DATE, defaultValue: NOW },
    rowkey: { type: DataTypes.SMALLINT, defaultValue: 0 },
    enabled: { type: DataTypes.BOOLEAN, defaultValue: true },
    idtg: { type: DataTypes.UUID, allowNull: false },
    uuid: { type: DataTypes.UUID, allowNull: false },
  },
  {
    freezeTableName: true,
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['idtg', 'uuid'],
      },
    ],
  },
)

device.hasMany(telegram_groups_devices, {
  foreignKey: 'uuid',
  sourceKey: 'uuid',
})

telegram_groups.hasMany(telegram_groups_devices, {
  foreignKey: 'idtg',
  sourceKey: 'idtg',
})
