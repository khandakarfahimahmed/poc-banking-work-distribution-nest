import { Injectable, Inject } from '@nestjs/common';
import { ICustomer } from './customer.interface';
import { Customer } from './customer.model';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('CUSTOMER_REPOSITORY')
    private readonly customerModel: typeof Customer,
  ) {}
  async findAllCustomer(): Promise<Customer[]> {
    return this.customerModel.findAll();
  }

  async create(customer: ICustomer): Promise<Customer> {
    return this.customerModel.create(customer);
  }
  async findByNid(nid_no: number): Promise<Customer> {
    return this.customerModel.findOne({ where: { nid_no } });
  }
  async findByPhone(phone: number): Promise<Customer> {
    return this.customerModel.findOne({ where: { phone } });
  }
}
