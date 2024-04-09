import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { DatabaseModule } from 'src/database/database.module';
import { CustomerController } from './customer.controller';
import { customerProviders } from './customer.providers';
import { WorkOrderModule } from 'src/reviewer-work-order/reviewer-work-order.module';
import { workOrderProviders } from '../reviewer-work-order/reviewer-work-order.providers';

import { PdfDataModule } from 'src/pdf-data/pdf-data.module';
import { PdfDataService } from 'src/pdf-data/pdf-data.service';
import { pdfDataProviders } from 'src/pdf-data/pdf-data.providers';
import { PdfListService } from 'src/docu-bucket/docu-bucket.service';
import { pdfListProviders } from 'src/docu-bucket/docu-bucket.providers';

@Module({
  imports: [DatabaseModule, WorkOrderModule, PdfDataModule],
  controllers: [CustomerController],
  providers: [
    CustomerService,
    PdfDataService,
    PdfListService,
    ...customerProviders,
    ...workOrderProviders,
    ...pdfDataProviders,
    ...pdfListProviders,
  ],
})
export class CustomerModule {}
