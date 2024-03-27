import { Injectable, Inject, Logger } from '@nestjs/common';
import { WorkFlowAssignLog } from './workflow-assign-log.model';
import { WorkOrderService } from '../work-order/work-order.service';
import { WorkOrder } from '../work-order/work-order.model';
import { Employee } from '../employee/employee.model';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class WorkFlowAssignLogService {
  private readonly logger = new Logger(WorkFlowAssignLogService.name);
  private readonly threshold = 3;
  constructor(
    @Inject('WORKFLOW_ASSIGN_LOG_REPOSITORY')
    private readonly workFlowAssignLogModel: typeof WorkFlowAssignLog,
    @Inject('WORKORDER_REPOSITORY')
    private readonly workOrderModel: typeof WorkOrder,
    @Inject('EMPLOYEE_REPOSITORY')
    private readonly employeeModel: typeof Employee,
  ) {}

  async assignTask(
    workOrderId: number,
    roleId: number,
    employeeId: number,
    stepId: number,
  ): Promise<void> {
    try {
      await this.workFlowAssignLogModel.create({
        work_order_id: workOrderId,
        role_id: roleId,
        employee_id: employeeId,
        step_id: stepId,
      });
      console.log(`Task ${workOrderId} assigned to ${employeeId}`);
    } catch (error) {
      console.log(
        `Error assigning task ${workOrderId} to ${employeeId}:`,
        error,
      );
    }
  }

  async updateWorkOrder(
    id: number,
    status: string,
    assignedTo: number,
  ): Promise<void> {
    try {
      await this.workOrderModel.update(
        {
          status: status,
          assigned_to: assignedTo,
          start_time: new Date(),
          isAssigned: true,
        },
        { where: { id } },
      );
      console.log(
        `Work order updated for task ${id} with assigned_to ${assignedTo}`,
      );
    } catch (error) {
      console.log(`Error updating work order for task ${id}:`, error);
    }
  }

  async distributeTask(): Promise<void> {
    try {
      // Find all active employees who are not admins
      const activeEmployees = await this.employeeModel.findAll({
        where: { active: true, admin: false },
      });

      // Fetch tasks for reviewers, makers, and checkers
      const tasksByRole = await Promise.all([
        this.workOrderModel.findAll({
          where: { status: 'reviewer', isAssigned: false },
        }),
        this.workOrderModel.findAll({
          where: { status: 'maker', isAssigned: false },
        }),
        this.workOrderModel.findAll({
          where: { status: 'checker', isAssigned: false },
        }),
      ]);

      // Distribute tasks for each role
      await Promise.all(
        activeEmployees.map(async (employee) => {
          const roleId = employee.role_id;
          const employeeId = employee.id;

          // Check if the employee is eligible for assignment based on role
          if (roleId === 2 && tasksByRole[0].length > 0) {
            // checks if tasks are availabe or not
            await this.assignAndExecute(tasksByRole[0], roleId, employeeId, 1);
          } else if (roleId === 3 && tasksByRole[1].length > 0) {
            await this.assignAndExecute(tasksByRole[1], roleId, employeeId, 2);
          } else if (roleId === 4 && tasksByRole[2].length > 0) {
            await this.assignAndExecute(tasksByRole[2], roleId, employeeId, 3);
          }
        }),
      );

      console.log('Tasks distributed successfully.');
    } catch (error) {
      console.error('Error distributing tasks:', error);
    }
  }

  async assignAndExecute(
    tasks: any[],
    roleId: number,
    employeeId: number,
    stepId: number,
  ) {
    // Filter tasks to meet threshold and assign to employee
    const eligibleTasks = tasks.slice(0, this.threshold);
    await Promise.all(
      eligibleTasks.map(async (task) => {
        await Promise.all([
          this.assignTask(task.id, roleId, employeeId, stepId),
          this.updateWorkOrder(task.id, task.status, employeeId),
        ]);
      }),
    );
  }

  //EVERY_30_MINUTES
  @Cron(CronExpression.EVERY_30_MINUTES, { name: 'distributeTask' })
  distributeTaskByCron() {
    this.logger.debug('Running distributeTask cron job...');
    return this.distributeTask();
  }
}
