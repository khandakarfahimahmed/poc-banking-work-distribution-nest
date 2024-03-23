import { Controller, Get } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerInterface } from './interfaces/customer-interface/customer-interface.interface';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  @Get()
  async getAll(): Promise<CustomerInterface[]> {
    return this.customerService.findAll();
  }
}
