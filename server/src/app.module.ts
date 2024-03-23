import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerController } from './customer/customer.controller';
import { CustomerModule } from './customer/customer.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { CustomerService } from './customer/customer.service';
import { customerProviders } from './customer/customer.providers';

@Module({
  imports: [CustomerModule],
  controllers: [AppController, CustomerController],
  providers: [AppService, CustomerService, ...customerProviders],
})
export class AppModule {}
