import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { DatabaseModule } from 'src/database.module';
import { CustomerController } from './customer.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
