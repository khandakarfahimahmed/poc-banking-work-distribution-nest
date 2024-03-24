require('dotenv').config();
import { Sequelize } from 'sequelize-typescript';
import { Customer } from './customer/customer.model';
import { WorkOrder } from './customer/work-order.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'ep-raspy-credit-a2strues.eu-central-1.pg.koyeb.app',
        port: 5432,
        username: 'koyeb-adm',
        password: 'l5wtcpoiN0TV',
        database: 'koyebdb',
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      });
      sequelize.addModels([Customer, WorkOrder]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
