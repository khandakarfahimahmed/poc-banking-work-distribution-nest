import {
  Sequelize,
  Model,
  Column,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IWorkFlowAssignLog } from './workflow-assign-log.interface';
import { WorkOrder } from '../reviewer-work-order/reviewer-work-order.model';
import { EmployeeRole } from '../employee-role/employee-role.model';
import { Employee } from '../employee/employee.model';

@Table({
  tableName: 'workflow_assign_log',
  timestamps: true,
  freezeTableName: true,
})
export class WorkFlowAssignLog
  extends Model<IWorkFlowAssignLog>
  implements IWorkFlowAssignLog
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER })
  id: number;

  @ForeignKey(() => WorkOrder)
  @Column
  work_order_id: number;

  @ForeignKey(() => Employee)
  @Column
  employee_id: number;
  @ForeignKey(() => EmployeeRole)
  @Column
  role_id: number;
  @Column
  step_id: number;
  @Column({ defaultValue: null })
  estimated_time: number | null;

  @BelongsTo(() => WorkOrder)
  workOrder!: WorkOrder;

  @BelongsTo(() => Employee)
  employee!: Employee;

  @BelongsTo(() => EmployeeRole)
  role!: EmployeeRole;
}

export default WorkFlowAssignLog;
