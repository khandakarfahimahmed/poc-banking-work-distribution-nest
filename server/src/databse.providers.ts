require('dotenv').config();
import { Sequelize } from 'sequelize-typescript';
import { Customer } from './customer/customer.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'fahim',
        database: 'user_db',
      });
      sequelize.addModels([Customer]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
