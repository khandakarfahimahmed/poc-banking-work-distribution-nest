import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { DatabaseModule } from 'src/database/database.module';
import { CustomerController } from './customer.controller';
import { customerProviders } from './customer.providers';
import { WorkOrderModule } from 'src/work-order/work-order.module';
import { workOrderProviders } from '../work-order/work-order.providers';
import { WorkOrderService } from 'src/work-order/work-order.service';
import { PdfDataModule } from 'src/pdf-data/pdf-data.module';
import { PdfDataService } from 'src/pdf-data/pdf-data.service';
import { pdfDataProviders } from 'src/pdf-data/pdf-data.providers';

@Module({
  imports: [DatabaseModule, WorkOrderModule, PdfDataModule],
  controllers: [CustomerController],
  providers: [
    CustomerService,
    WorkOrderService,
    PdfDataService,
    ...customerProviders,
    ...workOrderProviders,
    ...pdfDataProviders,
  ],
})
export class CustomerModule {}
