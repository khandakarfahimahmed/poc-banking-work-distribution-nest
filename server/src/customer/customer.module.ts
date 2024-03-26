import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { DatabaseModule } from 'src/database/database.module';
import { CustomerController } from './customer.controller';
import { customerProviders } from './customer.providers';
import { WorkOrderModule } from 'src/work-order/work-order.module';
import { workOrderProviders } from '../work-order/work-order.providers';
import { WorkOrderService } from 'src/work-order/work-order.service';

@Module({
  imports: [DatabaseModule, WorkOrderModule],
  controllers: [CustomerController],
  providers: [
    CustomerService,
    WorkOrderService,
    ...customerProviders,
    ...workOrderProviders,
  ],
})
export class CustomerModule {}
