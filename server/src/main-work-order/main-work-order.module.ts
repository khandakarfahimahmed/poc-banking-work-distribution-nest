import { Module } from '@nestjs/common';
import { MainWorkOrderService } from './main-work-order.service';
import { DatabaseModule } from 'src/database/database.module';
import { mainworkOrderProviders } from './main-work-order.providers';
import { MainWorkOrderController } from './main-work-order.controller';
import { EmployeeRoleModule } from 'src/employee-role/employee-role.module';
import { EmployeeRoleService } from 'src/employee-role/employee-role.service';
import ReviewerWorkOrder from './main-work-order.model';

@Module({
  imports: [DatabaseModule, EmployeeRoleModule],
  controllers: [MainWorkOrderController],
  providers: [
    MainWorkOrderService,
    EmployeeRoleService,
    ...mainworkOrderProviders,
  ],
})
export class MainWorkOrderModule {}
