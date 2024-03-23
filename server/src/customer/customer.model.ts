import { Sequelize, Model, Column, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { CustomerInterface } from './interfaces/customer-interface/customer-interface.interface';

@Table({
  tableName: 'customers',
  timestamps: true,
  freezeTableName: true,
})
export class Customer
  extends Model<CustomerInterface>
  implements CustomerInterface
{
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
  tin_no: number;
  @Column
  birth_certificate_no: number;

  //   @Column
  //   createdAt: Date;
  //   @Column
  //   updatedAt: Date;
}

export default Customer;
