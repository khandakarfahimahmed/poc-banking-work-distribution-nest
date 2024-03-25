import { Injectable, Inject } from '@nestjs/common';
import { ICustomer } from './interfaces/customer-interface.interface';
import { Customer } from './models/customer.model';
import { IWorkOrder } from './interfaces/work-order.interface';
import { WorkOrder } from './models/work-order.model';
import { Employee } from './models/employee.model';
import { IEmployee } from './interfaces/employee.interface';
import { WorkFlowAssignLog } from './models/workflow-assign-log.model';
import { IWorkFlowAssignLog } from './interfaces/workflow-assign-log.interface';
import { error, log } from 'console';
import { EmployeeStats } from './models/employee-stats.model';
import { IEmployeeStats } from './interfaces/employee-stats.interface';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('CUSTOMER_REPOSITORY')
    private readonly customerModel: typeof Customer,
    @Inject('WORKORDER_REPOSITORY')
    private readonly workOrderModel: typeof WorkOrder,
    @Inject('EMPLOYEE_REPOSITORY')
    private readonly employeeModel: typeof Employee,
    @Inject('WORKFLOW_ASSIGN_LOG_REPOSITORY')
    private readonly workFlowAssignLogModel: typeof WorkFlowAssignLog,
    @Inject('EMPLOYEE_STATS_REPOSITORY')
    private readonly employeeStatsModel: typeof EmployeeStats,
  ) {}
  async findAllCustomer(): Promise<Customer[]> {
    return this.customerModel.findAll();
  }

  async create(customer: ICustomer): Promise<Customer> {
    return this.customerModel.create(customer);
  }

  async createWorkOrder(workOrder: IWorkOrder): Promise<WorkOrder> {
    return this.workOrderModel.create(workOrder);
  }
  async findByNid(nid_no: number): Promise<Customer> {
    return this.customerModel.findOne({ where: { nid_no } });
  }
  async findByPhone(phone: number): Promise<Customer> {
    return this.customerModel.findOne({ where: { phone } });
  }

  async updateStatusReviewer(id: number): Promise<void> {
    await this.workOrderModel.update(
      { status: 'maker', isAssigned: false },
      { where: { id } },
    );
  }
  async updateStatusMaker(id: number): Promise<void> {
    await this.workOrderModel.update(
      { status: 'checker', isAssigned: false },
      { where: { id } },
    );
  }

  async findAllWorkOrder(): Promise<WorkOrder[]> {
    return this.workOrderModel.findAll();
  }

  async findActiveEmployee(): Promise<Employee[]> {
    return this.employeeModel.findAll({ where: { active: true } });
  }

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
    } catch (erro) {
      console.log(
        `Error assigning task ${workOrder_id} to ${employee_id}:`,
        error,
      );
    }
  }

  async updateWorkOrder(
    id: number,
    status: string,
    assigned_to: string,
  ): Promise<void> {
    try {
      await this.workOrderModel.update(
        {
          status: status,
          assigned_to: assigned_to,
          start_time: new Date(),
          isAssigned: true,
        },
        { where: { id } },
      );
      console.log(
        `work order updated for task ${id} with assigned_to ${assigned_to}`,
      );
    } catch (error) {
      console.log(`Error updating work order for task ${id}:`, error);
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
            await this.updateWorkOrder(
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
            await this.updateWorkOrder(
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
            await this.updateWorkOrder(
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
