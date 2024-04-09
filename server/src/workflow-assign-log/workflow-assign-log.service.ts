import { Injectable, Inject, Logger } from '@nestjs/common';
import { WorkFlowAssignLog } from './workflow-assign-log.model';
// import { WorkOrderService } from '../work-order/work-order.service';
// import { WorkOrder } from '../work-order/work-order.model';
import { Employee } from '../employee/employee.model';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EmployeeRole } from '../employee-role/employee-role.model';
import { Op } from 'sequelize';
import { Customer, CustomerAccountList } from '../customer/customer.model';

export interface IWorkFlowAssignLogWithNames {
  id: number;
  acc_id: number;
  work_order_id: number;
  acc_type: string;
  employee_name: string;
  role_name: string;
}
@Injectable()
export class WorkFlowAssignLogService {
  private readonly logger = new Logger(WorkFlowAssignLogService.name);
  private readonly threshold = 3;

  constructor(
    @Inject('WORKFLOW_ASSIGN_LOG_REPOSITORY')
    private readonly workFlowAssignLogModel: typeof WorkFlowAssignLog,
    @Inject('WORKORDER_REPOSITORY')
    // private readonly workOrderModel: typeof WorkOrder,
    @Inject('EMPLOYEE_REPOSITORY')
    private readonly employeeModel: typeof Employee,
    @Inject('EMPLOYEE_ROLE_REPOSITORY')
    private readonly employeeRoleModel: typeof EmployeeRole,
    @Inject('CUSTOMER_REPOSITORY')
    private readonly customerModel: typeof Customer,
    @Inject('CUSTOMER_ACCOUNT_LIST_REPOSITORY')
    private readonly customerAccountListModel: typeof CustomerAccountList,
  ) {}

  // async findAll(): Promise<any[]> {
  //   // Fetch all records with necessary associations
  //   const result = await this.workFlowAssignLogModel.findAll({
  //     include: [
  //       {
  //         model: WorkOrder,
  //         attributes: ['acc_id', 'acc_type'],
  //         as: 'workOrder',
  //       },
  //       {
  //         model: Employee,
  //         attributes: ['name'],
  //         as: 'employee',
  //       },
  //       {
  //         model: EmployeeRole,
  //         attributes: ['name'],
  //         as: 'role',
  //       },
  //     ],
  //   });

  //   // Group records by acc_id
  //   const groupedData: { [key: number]: any } = {};
  //   result.forEach((log) => {
  //     const accId = log.workOrder.acc_id;
  //     if (!groupedData[accId]) {
  //       groupedData[accId] = {
  //         acc_id: accId,
  //         acc_type: log.workOrder.acc_type,
  //         Reviewer: null,
  //         Maker: null,
  //         Checker: null,
  //       };
  //     }
  //     if (log.role.name === 'reviewer') {
  //       groupedData[accId].Reviewer = log.employee.name;
  //     } else if (log.role.name === 'maker') {
  //       groupedData[accId].Maker = log.employee.name;
  //     } else if (log.role.name === 'checker') {
  //       groupedData[accId].Checker = log.employee.name;
  //     }
  //   });

  //   // Convert grouped data to array
  //   const formattedResult = Object.values(groupedData);

  //   return formattedResult;
  // }

  // async assignTask(
  //   workOrder_id: number,
  //   role_id: number,
  //   employee_id: number,
  //   step_id: number,
  // ): Promise<void> {
  //   try {
  //     await this.workFlowAssignLogModel.create({
  //       work_order_id: workOrder_id,
  //       role_id: role_id,
  //       employee_id: employee_id,
  //       step_id: step_id,
  //     });
  //     console.log(`Task ${workOrder_id} assigned to ${employee_id}`);
  //   } catch (error) {
  //     console.log(
  //       `Error assigning task ${workOrder_id} to ${employee_id}:`,
  //       error,
  //     );
  //   }
  // }
  // async updateWorkOrder(
  //   id: number,
  //   status: string,
  //   assignedTo: number,
  // ): Promise<void> {
  //   try {
  //     await this.workOrderModel.update(
  //       {
  //         status: status,
  //         assigned_to: assignedTo,
  //         start_time: new Date(),
  //         isAssigned: true,
  //       },
  //       { where: { id } },
  //     );
  //     console.log(
  //       `Work order updated for task ${id} with assigned_to ${assignedTo}`,
  //     );
  //   } catch (error) {
  //     console.log(`Error updating work order for task ${id}:`, error);
  //   }
  // }

  // async distributeTask(): Promise<void> {
  //   try {
  //     const activeEmployeesReviewer = await this.employeeModel.findAll({
  //       where: { active: true, admin: false, role_id: 2 },
  //     });
  //     for (let i = 0; i < activeEmployeesReviewer.length; i++) {
  //       const taskForReviwer = await this.workOrderModel.findAll({
  //         where: {
  //           status: 'reviewer',
  //           isAssigned: false,
  //         },
  //       });

  //       for (let j = 0; j < taskForReviwer.length; j++) {
  //         if (j < this.threshold) {
  //           await this.assignTask(
  //             taskForReviwer[j].id,
  //             activeEmployeesReviewer[i].role_id,
  //             activeEmployeesReviewer[i].id,
  //             1,
  //           );
  //           await this.updateWorkOrder(
  //             taskForReviwer[j].id,
  //             'reviewer',
  //             activeEmployeesReviewer[i].id,
  //           );
  //         }
  //       }
  //     }
  //     const activeEmployeesMaker = await this.employeeModel.findAll({
  //       where: { active: true, admin: false, role_id: 3 },
  //     });
  //     for (let i = 0; i < activeEmployeesMaker.length; i++) {
  //       const taskForMaker = await this.workOrderModel.findAll({
  //         where: {
  //           status: 'maker',
  //           isAssigned: false,
  //         },
  //       });

  //       for (let j = 0; j < taskForMaker.length; j++) {
  //         if (j < this.threshold) {
  //           await this.assignTask(
  //             taskForMaker[j].id,
  //             activeEmployeesMaker[i].role_id,
  //             activeEmployeesMaker[i].id,
  //             1,
  //           );
  //           await this.updateWorkOrder(
  //             taskForMaker[j].id,
  //             'maker',
  //             activeEmployeesMaker[i].id,
  //           );
  //         }
  //       }
  //     }
  //     const activeEmployeesChecker = await this.employeeModel.findAll({
  //       where: { active: true, admin: false, role_id: 4 },
  //     });
  //     for (let i = 0; i < activeEmployeesChecker.length; i++) {
  //       const taskForChecker = await this.workOrderModel.findAll({
  //         where: {
  //           status: 'checker',
  //           isAssigned: false,
  //         },
  //       });

  //       for (let j = 0; j < taskForChecker.length; j++) {
  //         if (j < this.threshold) {
  //           await this.assignTask(
  //             taskForChecker[j].id,
  //             activeEmployeesChecker[i].role_id,
  //             activeEmployeesChecker[i].id,
  //             1,
  //           );
  //           await this.updateWorkOrder(
  //             taskForChecker[j].id,
  //             'maker',
  //             activeEmployeesChecker[i].id,
  //           );
  //         }
  //       }
  //     }
  //     console.log('Tasks distributed successfully.');
  //   } catch (error) {
  //     console.error('Error distributing tasks:', error);
  //   }
  // }
  // // EVERY_30_MINUTES
  // // @Cron(CronExpression.EVERY_MINUTE, { name: 'distributeTask' })
  // distributeTaskByCron() {
  //   this.logger.debug('Running distributeTask cron job...');
  //   return this.distributeTask();
  // }
}
