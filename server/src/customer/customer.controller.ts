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
