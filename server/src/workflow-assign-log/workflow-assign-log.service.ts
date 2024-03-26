import { Injectable, Inject } from '@nestjs/common';
import { WorkFlowAssignLog } from './workflow-assign-log.model';
import { IWorkFlowAssignLog } from './workflow-assign-log.interface';
import { WorkOrderService } from '../work-order/work-order.service';
import { WorkOrder } from '../work-order/work-order.model';
import { Employee } from '../employee/employee.model';
import { IEmployee } from '../employee/employee.interface';
import { error, log } from 'console';

@Injectable()
export class WorkFlowAssignLogService {
  constructor(
    @Inject('WORKFLOW_ASSIGN_LOG_REPOSITORY')
    private readonly workFlowAssignLogModel: typeof WorkFlowAssignLog,
    @Inject('WORKORDER_REPOSITORY')
    private readonly workOrderModel: typeof WorkOrder,
    @Inject('EMPLOYEE_REPOSITORY')
    private readonly employeeModel: typeof Employee,
    private readonly workOrderService: WorkOrderService,
  ) {}
  async assignTask(
    workOrder_id: number,
    role_id: string,
    employee_id: string,
    step_id: number,
  ): Promise<void> {
    try {
      await this.workFlowAssignLogModel.create({
        work_order_id: workOrder_id,
        role_id: role_id,
        employee_id: employee_id,
        step_id: step_id,
      });
      console.log(`Task ${workOrder_id} assigned to ${employee_id}`);
    } catch (error) {
      console.log(
        `Error assigning task ${workOrder_id} to ${employee_id}:`,
        error,
      );
    }
  }
  threshold = 3;
  async distributeTask(): Promise<void> {
    try {
      const activeEmployees = await this.employeeModel.findAll({
        where: { active: true },
      });
      for (let i = 0; i < activeEmployees.length; i++) {
        const taskForReviwer = await this.workOrderModel.findAll({
          where: {
            status: 'reviewer',
            isAssigned: false,
          },
        });

        const taskForMaker = await this.workOrderModel.findAll({
          where: {
            status: 'maker',
            isAssigned: false,
          },
        });

        const taskForChecker = await this.workOrderModel.findAll({
          where: {
            status: 'checker',
            isAssigned: false,
          },
        });
        for (let j = 0; j < taskForReviwer.length; j++) {
          if (j < this.threshold) {
            await this.assignTask(
              taskForReviwer[j].id,
              'reviewer',
              activeEmployees[i].id,
              1,
            );
            await this.workOrderService.updateWorkOrder(
              taskForReviwer[j].id,
              'reviewer',
              activeEmployees[i].id,
            );
          }
        }
        for (let k = 0; k < taskForMaker.length; k++) {
          if (k < this.threshold) {
            await this.assignTask(
              taskForMaker[k].id,
              'maker',
              activeEmployees[i].id,
              2,
            );
            await this.workOrderService.updateWorkOrder(
              taskForMaker[k].id,
              'maker',
              activeEmployees[i].id,
            );
          }
        }
        for (let l = 0; l < taskForChecker.length; l++) {
          if (l < this.threshold) {
            await this.assignTask(
              taskForChecker[l].id,
              'checker',
              activeEmployees[i].id,
              3,
            );
            await this.workOrderService.updateWorkOrder(
              taskForChecker[l].id,
              'checker',
              activeEmployees[i].id,
            );
          }
        }
      }
      console.log('Tasks distributed successfully.');
    } catch (error) {
      console.error('Error distributing tasks:', error);
    }
  }
}
