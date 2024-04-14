import { Module } from '@nestjs/common';
import { ReviewerWorkOrderService } from './reviewer-work-order.service';
import { DatabaseModule } from 'src/database/database.module';
import { reviewerWorkOrderProviders } from './reviewer-work-order.providers';
import { ReviewerWorkOrderController } from './reviewer-work-order.controller';
import { EmployeeRoleModule } from 'src/employee-role/employee-role.module';
import { EmployeeRoleService } from 'src/employee-role/employee-role.service';
import ReviewerWorkOrder from './reviewer-work-order.model';

@Module({
  imports: [DatabaseModule, EmployeeRoleModule],
  controllers: [ReviewerWorkOrderController],
  providers: [
    ReviewerWorkOrderService,
    EmployeeRoleService,
    ...reviewerWorkOrderProviders,
  ],
})
export class ReviewerWorkOrderModule {}
