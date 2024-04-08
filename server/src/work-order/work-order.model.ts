import {
  Sequelize,
  Model,
  Column,
  Table,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IWorkOrder } from './work-order.interface';
import { WorkFlowAssignLog } from '../workflow-assign-log/workflow-assign-log.model';
import { Employee } from '../employee/employee.model';
import { Customer } from 'src/customer/customer.model';

@Table({
  tableName: 'work_orders',
  timestamps: true,
  freezeTableName: true,
})
export class WorkOrder extends Model<IWorkOrder> implements IWorkOrder {
  @Column({ primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER })
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
  assigned_to: number | null;
  @Column
  start_time: Date | null;

  @Column({ defaultValue: false })
  isAssigned: boolean;
  @Column({ defaultValue: null })
  estimated_time: number | null;

  @HasMany(() => WorkFlowAssignLog)
  workflowAssignLogs!: WorkFlowAssignLog[];
  @BelongsTo(() => Employee, 'assigned_to')
  assignedEmployee!: Employee;
}

export default WorkOrder;
