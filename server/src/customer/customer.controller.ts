import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { WorkOrderService } from '../work-order/work-order.service';

import { ICustomer } from './customer.interface';

@Controller('customer')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly workOrderService: WorkOrderService,
  ) {}
  @Get()
  async getAllCustomer(): Promise<ICustomer[]> {
    return this.customerService.findAllCustomer();
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
    await this.workOrderService.createWorkOrder({
      acc_id: null,
      customer_id: null,
      type: 'Account opening',
      acc_type: 'personal',
      status: 'reviewer',
      assigned_to: null,
      start_time: null,
      isAssigned: false,
    });
    return createdCustomer;
  }

  @Get('search')
  async getCustomer(
    @Body() searchData: { nid_no?: number; phone?: number },
  ): Promise<ICustomer> {
    const { nid_no, phone } = searchData;

    if (!nid_no && !phone) {
      throw new HttpException(
        'Either nid_no or phone must be provided',
        HttpStatus.BAD_REQUEST,
      );
    }

    let customer: ICustomer;

    if (nid_no) {
      customer = await this.customerService.findByNid(nid_no);
    } else {
      customer = await this.customerService.findByPhone(phone);
    }

    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }

    return customer;
  }
}
