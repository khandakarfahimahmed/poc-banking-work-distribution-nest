import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { ICustomer } from './interfaces/customer-interface.interface';
import { IWorkOrder } from './interfaces/work-order.interface';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  @Get()
  async getAll(): Promise<ICustomer[]> {
    return this.customerService.findAll();
  }

  @Post()
  async postCustomer(@Body() customer: ICustomer): Promise<ICustomer> {
    const existingCustomer = await this.customerService.findByNid(
      customer.nid_no,
    );
    if (existingCustomer) {
      throw new HttpException(
        'NID number already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const createdCustomer = await this.customerService.create(customer);
    await this.customerService.createWorkOrder({
      name: customer.name,
      nid_no: customer.nid_no,
      phone: customer.phone,
      stage: 'reviewer',
      status: 'reviewer',
      type: 'Account opening',
      account_type: customer.account_type,
      first_step: 'null',
      second_step: 'null',
      third_step: 'null',
    });
    return createdCustomer;
  }
}
