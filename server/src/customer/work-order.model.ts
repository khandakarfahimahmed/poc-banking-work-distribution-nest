import { Sequelize, Model, Column, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IWorkOrder } from './interfaces/work-order.interface';

@Table({
  tableName: 'work_orders',
  timestamps: true,
  freezeTableName: true,
})
export class WorkOrder extends Model<IWorkOrder> implements IWorkOrder {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;
  @Column
  name: string;
  @Column({ unique: true })
  nid_no: number;
  @Column
  phone: number;
  @Column({ defaultValue: 'reviewer' })
  stage: string;
  @Column({ defaultValue: 'reviewer' })
  status: string;
  @Column
  type: string;
  @Column
  account_type: string;
  @Column
  first_step: string | null;
  @Column
  second_step: string | null;
  @Column
  third_step: string | null;
}

export default WorkOrder;
