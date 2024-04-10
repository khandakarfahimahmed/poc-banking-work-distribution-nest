import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerController } from './customer/customer.controller';
import { CustomerModule } from './customer/customer.module';
import { EmployeeModule } from './employee/employee.module';
import { EmployeeStatsModule } from './employee-stats/employee-stats.module';
import { WorkFlowAssignLogModule } from './workflow-assign-log/workflow-assign-log.module';
import { WorkOrderModule } from './reviewer-work-order/reviewer-work-order.module';

import { CustomerService } from './customer/customer.service';
import { EmployeeService } from './employee/employee.service';
import { EmployeeStatsService } from './employee-stats/employee-stats.service';
import { WorkFlowAssignLogService } from './workflow-assign-log/workflow-assign-log.service';
import { ReviewerWorkOrderService } from './reviewer-work-order/reviewer-work-order.service';

import { customerProviders } from './customer/customer.providers';
import { employeeProviders } from './employee/employee.providers';
import { employeeStatsProviders } from './employee-stats/employee-stats.providers';
import { workFlowAssignLogProviders } from './workflow-assign-log/workflow-assign-log.providers';
import { workOrderProviders } from './reviewer-work-order/reviewer-work-order.providers';
import { EmployeeController } from './employee/employee.controller';
import { EmployeeStatsController } from './employee-stats/employee-stats.controller';
import { WorkflowAssignLogController } from './workflow-assign-log/workflow-assign-log.controller';
import { ReviewerWorkOrderController } from './reviewer-work-order/reviewer-work-order.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { PdfDataModule } from './pdf-data/pdf-data.module';
import { PdfDataController } from './pdf-data/pdf-data.controller';
import { PdfDataService } from './pdf-data/pdf-data.service';
import { pdfDataProviders } from './pdf-data/pdf-data.providers';
import { EmployeeRoleModule } from './employee-role/employee-role.module';
import { EmployeeRoleController } from './employee-role/employee-role.controller';
import { EmployeeRoleService } from './employee-role/employee-role.service';
import { employeeRoleProviders } from './employee-role/employee-role.providers';
import { pdfListProviders } from './docu-bucket/docu-bucket.providers';
import { PdfListController } from './docu-bucket/docu-bucket.controller';
import { PdfListService } from './docu-bucket/docu-bucket.service';
import { PdfListModule } from './docu-bucket/docu-bucket.module';
import Pdf from './pdf/pdf.model';
import MainWorkOrder from './main-work-order/main-work-order.model';
import { pdfProviders } from './pdf/pdf.providers';
import { mainworkOrderProviders } from './main-work-order/main-work-order.providers';
import { PdfController } from './pdf/pdf.controller';
import { MainWorkOrderController } from './main-work-order/main-work-order.controller';
import { PdfModule } from './pdf/pdf.module';
import { MainWorkOrderModule } from './main-work-order/main-work-order.module';
import { PdfService } from './pdf/pdf.service';
import { MainWorkOrderService } from './main-work-order/main-work-order.service';
import { FieldDataController } from './field-data/field-data.controller';
import { FieldDataService } from './field-data/field-data.service';
import { fieldDataProviders } from './field-data/field-data.providers';

@Module({
  imports: [
    CustomerModule,
    EmployeeModule,
    EmployeeStatsModule,
    WorkFlowAssignLogModule,
    WorkOrderModule,
    PdfDataModule,
    EmployeeRoleModule,
    PdfListModule,
    PdfModule,
    MainWorkOrderModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [
    AppController,
    CustomerController,
    EmployeeController,
    EmployeeStatsController,
    WorkflowAssignLogController,
    ReviewerWorkOrderController,
    EmployeeRoleController,
    PdfDataController,
    PdfListController,
    PdfController,
    MainWorkOrderController,
    FieldDataController,
  ],
  providers: [
    AppService,
    CustomerService,
    EmployeeService,
    EmployeeStatsService,
    WorkFlowAssignLogService,
    ReviewerWorkOrderService,
    PdfDataService,
    EmployeeRoleService,
    PdfListService,
    PdfService,
    MainWorkOrderService,
    FieldDataService,
    ...customerProviders,
    ...employeeProviders,
    ...employeeStatsProviders,
    ...workFlowAssignLogProviders,
    ...workOrderProviders,
    ...pdfDataProviders,
    ...employeeRoleProviders,
    ...pdfListProviders,
    ...pdfProviders,
    ...mainworkOrderProviders,
    ...fieldDataProviders,
  ],
})
export class AppModule {}
