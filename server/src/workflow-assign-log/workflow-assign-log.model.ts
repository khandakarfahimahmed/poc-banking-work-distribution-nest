import { Sequelize, Model, Column, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IWorkFlowAssignLog } from './workflow-assign-log.interface';

@Table({
  tableName: 'workflow_assign_log',
  timestamps: true,
  freezeTableName: true,
})
export class WorkFlowAssignLog
  extends Model<IWorkFlowAssignLog>
  implements IWorkFlowAssignLog
{
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;
  @Column
  work_order_id: number;
  @Column
  employee_id: number;
  @Column
  role_id: number;
  @Column
  step_id: number;
}

export default WorkFlowAssignLog;
