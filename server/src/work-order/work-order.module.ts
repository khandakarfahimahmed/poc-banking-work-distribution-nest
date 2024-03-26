import { Module } from '@nestjs/common';
import { WorkOrderService } from './work-order.service';
import { DatabaseModule } from 'src/database/database.module';
import { workOrderProviders } from './work-order.providers';
import { WorkOrderController } from './work-order.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [WorkOrderController],
  providers: [WorkOrderService, ...workOrderProviders],
})
export class WorkOrderModule {}
