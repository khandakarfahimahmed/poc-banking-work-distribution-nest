import { Module } from '@nestjs/common';
import { WorkFlowAssignLogService } from './workflow-assign-log.service';
import { WorkflowAssignLogController } from './workflow-assign-log.controller';
import { DatabaseModule } from 'src/database/database.module';
import { workFlowAssignLogProviders } from './workflow-assign-log.providers';
import { workOrderProviders } from '../reviewer-work-order/reviewer-work-order.providers';
import { employeeProviders } from '../employee/employee.providers';
// Import WorkOrderService
import { WorkOrderModule } from 'src/reviewer-work-order/reviewer-work-order.module';
import { EmployeeModule } from 'src/employee/employee.module';

@Module({
  imports: [DatabaseModule],
  controllers: [WorkflowAssignLogController],
  providers: [
    WorkFlowAssignLogService, // Provide WorkOrderService here
    ...workFlowAssignLogProviders,
    ...workOrderProviders,
    ...employeeProviders,
  ],
})
export class WorkFlowAssignLogModule {}
