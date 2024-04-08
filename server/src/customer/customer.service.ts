import { Injectable, Inject } from '@nestjs/common';
import { ICustomer, ICustomerAccountNo } from './customer.interface';
import { Customer, CustomerAccountList } from './customer.model';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('CUSTOMER_REPOSITORY')
    private readonly customerModel: typeof Customer,
    @Inject('CUSTOMER_ACCOUNT_REPOSITORY')
    private readonly customerAccountListModel: typeof CustomerAccountList,
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
  async createAccList(
    accList: ICustomerAccountNo,
  ): Promise<CustomerAccountList> {
    return this.customerAccountListModel.create(accList);
  }
  async findMaxAccId(existingCustomer: Customer): Promise<any> {
    const maxAccId = await this.customerAccountListModel.max('acc_id');
    return maxAccId;
  }
}
