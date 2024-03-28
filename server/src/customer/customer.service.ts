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

  async create(customer: any): Promise<Customer> {
    return this.customerModel.create(customer);
  }
  async findByNid(nid_no: any): Promise<Customer> {
    if (!nid_no) {
      throw new Error('NID number must be provided');
    }
    return this.customerModel.findOne({ where: { nid_no } });
  }
  async findByPhone(phone: number): Promise<Customer> {
    return this.customerModel.findOne({ where: { phone } });
  }
}
