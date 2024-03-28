import { Sequelize, Model, Column, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { ICustomer, ICustomerAccountNo } from './customer.interface';

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

@Table({
  tableName: 'account_list',
  timestamps: true,
  freezeTableName: true,
})
export class CustomerAccountList
  extends Model<ICustomerAccountNo>
  implements ICustomerAccountNo
{
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;
  @Column
  acc_id: number;
  @Column
  customer_id: number;
}

export default { Customer, CustomerAccountList };
