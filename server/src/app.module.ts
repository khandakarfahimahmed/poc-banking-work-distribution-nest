import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerController } from './customer/customer.controller';
import { CustomerModule } from './customer/customer.module';
import { EmployeeModule } from './employee/employee.module';
import { EmployeeStatsModule } from './employee-stats/employee-stats.module';
import { WorkFlowAssignLogModule } from './workflow-assign-log/workflow-assign-log.module';
import { WorkOrderModule } from './work-order/work-order.module';

import { CustomerService } from './customer/customer.service';
import { EmployeeService } from './employee/employee.service';
import { EmployeeStatsService } from './employee-stats/employee-stats.service';
import { WorkFlowAssignLogService } from './workflow-assign-log/workflow-assign-log.service';
import { WorkOrderService } from './work-order/work-order.service';

import { customerProviders } from './customer/customer.providers';
import { employeeProviders } from './employee/employee.providers';
import { employeeStatsProviders } from './employee-stats/employee-stats.providers';
import { workFlowAssignLogProviders } from './workflow-assign-log/workflow-assign-log.providers';
import { workOrderProviders } from './work-order/work-order.providers';
import { EmployeeController } from './employee/employee.controller';
import { EmployeeStatsController } from './employee-stats/employee-stats.controller';
import { WorkflowAssignLogController } from './workflow-assign-log/workflow-assign-log.controller';
import { WorkOrderController } from './work-order/work-order.controller';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    CustomerModule,
    EmployeeModule,
    EmployeeStatsModule,
    WorkFlowAssignLogModule,
    WorkOrderModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [
    AppController,
    CustomerController,
    EmployeeController,
    EmployeeStatsController,
    WorkflowAssignLogController,
    WorkOrderController,
  ],
  providers: [
    AppService,
    CustomerService,
    EmployeeService,
    EmployeeStatsService,
    WorkFlowAssignLogService,
    WorkOrderService,
    ...customerProviders,
    ...employeeProviders,
    ...employeeStatsProviders,
    ...workFlowAssignLogProviders,
    ...workOrderProviders,
  ],
})
export class AppModule {}
