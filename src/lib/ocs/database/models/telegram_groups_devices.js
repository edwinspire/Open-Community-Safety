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
    rowkey: { type: DataTypes.SMALLINT, defaultValue: 0 },
    enabled: { type: DataTypes.BOOLEAN, defaultValue: true },
    idtg: { type: DataTypes.UUID, allowNull: false },
    device_id: { type: DataTypes.UUID, allowNull: false },
  },
  {
    freezeTableName: true,
    indexes: [
      {
        unique: true,
        fields: ['idtg', 'device_id'],
      },
    ],
  },
)

device.hasMany(telegram_groups_devices, {
  foreignKey: 'device_id',
  sourceKey: 'device_id',
})

telegram_groups.hasMany(telegram_groups_devices, {
  foreignKey: 'idtg',
  sourceKey: 'idtg',
})
