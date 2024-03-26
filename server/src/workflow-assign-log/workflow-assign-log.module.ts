import { Module } from '@nestjs/common';
import { WorkFlowAssignLogService } from './workflow-assign-log.service';
import { WorkflowAssignLogController } from './workflow-assign-log.controller';
import { DatabaseModule } from 'src/database/database.module';
import { workFlowAssignLogProviders } from './workflow-assign-log.providers';
import { workOrderProviders } from '../work-order/work-order.providers';
import { employeeProviders } from '../employee/employee.providers';
import { WorkOrderService } from '../work-order/work-order.service'; // Import WorkOrderService
import { WorkOrderModule } from 'src/work-order/work-order.module';
import { EmployeeModule } from 'src/employee/employee.module';

@Module({
  imports: [DatabaseModule],
  controllers: [WorkflowAssignLogController],
  providers: [
    WorkFlowAssignLogService,
    WorkOrderService, // Provide WorkOrderService here
    ...workFlowAssignLogProviders,
    ...workOrderProviders,
    ...employeeProviders,
  ],
})
export class WorkFlowAssignLogModule {}
