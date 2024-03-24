require('dotenv').config();
import { Sequelize } from 'sequelize-typescript';
import { Customer } from './customer/models/customer.model';
import { WorkOrder } from './customer/models/work-order.model';
import { WorkFlowAssignLog } from './customer/models/workflow-assign-log.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'ep-bitter-frost-28031087.eu-central-1.pg.koyeb.app',
        port: 5432,
        username: 'koyeb-adm',
        password: 'sZBmxOp2n3SR',
        database: 'koyebdb',
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      });
      sequelize.addModels([Customer, WorkOrder, WorkFlowAssignLog]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
