import { Injectable, Inject } from '@nestjs/common';
import { ICustomer } from './interfaces/customer-interface.interface';
import { Customer } from './models/customer.model';
import { IWorkOrder } from './interfaces/work-order.interface';
import { WorkOrder } from './models/work-order.model';
import { Employee } from './models/employee.model';
import { IEmployee } from './interfaces/employee.interface';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('CUSTOMER_REPOSITORY')
    private readonly customerModel: typeof Customer,
    @Inject('WORKORDER_REPOSITORY')
    private readonly workOrderModel: typeof WorkOrder,
    @Inject('EMPLOYEE_REPOSITORY')
    private readonly employeeModel: typeof Employee,
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

  // async updateStatusReviewer(
  //   id: number,
  //   stage: string,
  //   first_step: string,
  // ): Promise<void> {
  //   await this.workOrderModel.update({ stage, first_step }, { where: { id } });
  // }
  // async updateStatusMaker(
  //   id: number,
  //   stage: string,
  //   second_step: string,
  // ): Promise<void> {
  //   await this.workOrderModel.update({ stage, second_step }, { where: { id } });
  // }
  // async updateStatusChecker(
  //   id: number,
  //   stage: string,
  //   third_step: string,
  // ): Promise<void> {
  //   await this.workOrderModel.update({ stage, third_step }, { where: { id } });
  // }
  async findAllWorkOrder(): Promise<WorkOrder[]> {
    return this.workOrderModel.findAll();
  }

  async findAllEmployee(): Promise<Employee[]> {
    return this.employeeModel.findAll({ where: { active: true } });
  }
}
