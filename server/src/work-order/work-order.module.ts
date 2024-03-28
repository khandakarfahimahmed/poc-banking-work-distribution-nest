import { Module } from '@nestjs/common';
import { WorkOrderService } from './work-order.service';
import { DatabaseModule } from 'src/database/database.module';
import { workOrderProviders } from './work-order.providers';
import { WorkOrderController } from './work-order.controller';
import { EmployeeRoleModule } from 'src/employee-role/employee-role.module';
import { EmployeeRoleService } from 'src/employee-role/employee-role.service';

@Module({
  imports: [DatabaseModule, EmployeeRoleModule],
  controllers: [WorkOrderController],
  providers: [WorkOrderService, EmployeeRoleService, ...workOrderProviders],
})
export class WorkOrderModule {}
