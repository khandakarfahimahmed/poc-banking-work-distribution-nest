import { Injectable, Inject } from '@nestjs/common';
import { CustomerInterface } from './interfaces/customer-interface/customer-interface.interface';
import { Customer } from './customer.model';
@Injectable()
export class CustomerService {
  constructor(
    @Inject('CUSTOMER_REPOSITORY')
    private readonly customerModel: typeof Customer,
  ) {}
  async findAll(): Promise<Customer[]> {
    return this.customerModel.findAll();
  }
}
