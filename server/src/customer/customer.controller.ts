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
import { workerData } from 'worker_threads';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
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
    await this.customerService.createWorkOrder({
      acc_id: null,
      customer_id: null,
      type: 'customer',
      acc_type: 'personal',
      status: 'reviewer',
      assigned_to: null,
      start_time: null,
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

  @Post('update-status')
  async updateStatus(
    @Body()
    updateData: {
      id: number;
      stage: string;
      'first-step'?: string;
      'second-step'?: string;
      'third-step'?: string;
    },
  ): Promise<IWorkOrder[]> {
    const {
      id,
      stage,
      'first-step': first_step,
      'second-step': second_step,
      'third-step': third_step,
    } = updateData;
    if (!id) {
      throw new HttpException('id must be provided', HttpStatus.BAD_REQUEST);
    }
    if (!stage) {
      throw new HttpException('stage must be provided', HttpStatus.BAD_REQUEST);
    }
    if (!first_step && !second_step && !third_step) {
      throw new HttpException('step must be provided', HttpStatus.BAD_REQUEST);
    }
    // if (first_step) {
    //   await this.customerService.updateStatusReviewer(id, stage, first_step);
    // } else if (second_step) {
    //   await this.customerService.updateStatusMaker(id, stage, second_step);
    // } else if (third_step) {
    //   await this.customerService.updateStatusChecker(id, stage, third_step);
    // }

    return this.customerService.findAllWorkOrder();
  }
}
