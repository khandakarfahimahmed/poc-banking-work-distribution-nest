import { Injectable, Inject } from '@nestjs/common';
import { ICustomer } from './interfaces/customer-interface.interface';
import { Customer } from './customer.model';
import { IWorkOrder } from './interfaces/work-order.interface';
import { WorkOrder } from './work-order.model';
@Injectable()
export class CustomerService {
  constructor(
    @Inject('CUSTOMER_REPOSITORY')
    private readonly customerModel: typeof Customer,
    @Inject('WORKORDER_REPOSITORY')
    private readonly workOrderModel: typeof WorkOrder,
  ) {}
  async findAll(): Promise<Customer[]> {
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
}
