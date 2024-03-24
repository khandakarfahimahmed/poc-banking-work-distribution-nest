import { Sequelize, Model, Column, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { ICustomer } from './interfaces/customer-interface.interface';

@Table({
  tableName: 'customers',
  timestamps: true,
  freezeTableName: true,
})
export class Customer extends Model<ICustomer> implements ICustomer {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;
  @Column
  name: string;
  @Column({ unique: true })
  nid_no: number;
  @Column
  phone: number;
  @Column
  address: string;
  @Column
  email: string;
  @Column
  tin_no: string;
  @Column
  birth_certificate_no: number;
  @Column
  account_type: string;
}

export default Customer;
