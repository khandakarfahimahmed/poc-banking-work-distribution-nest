import { Sequelize, Model, Column, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IWorkOrder } from './work-order.interface';

@Table({
  tableName: 'work_orders',
  timestamps: true,
  freezeTableName: true,
})
export class WorkOrder extends Model<IWorkOrder> implements IWorkOrder {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;
  @Column
  acc_id: number;
  @Column
  customer_id: number;
  @Column
  type: string;
  @Column
  acc_type: string;
  @Column
  status: string | null;
  @Column
  assigned_to: string | null;
  @Column
  start_time: Date | null;

  @Column({ defaultValue: false })
  isAssigned: boolean;
}

export default WorkOrder;
