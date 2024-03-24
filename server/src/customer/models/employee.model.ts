import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  HasOne,
  HasMany,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IEmployee } from '../interfaces/employee.interface';

@Table({
  tableName: 'employee',
  timestamps: false, // Disable timestamps
  freezeTableName: true, // Prevent table name changes
})
export class Employee extends Model<IEmployee> {
  @Column({
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  })
  phone: string;

  @Column({
    type: DataTypes.BOOLEAN,
    allowNull: false,
  })
  active: boolean;

  @Column({
    type: DataTypes.BOOLEAN,
    allowNull: false,
  })
  admin: boolean;

  @Column
  role_id: string;
}
export default Employee;
