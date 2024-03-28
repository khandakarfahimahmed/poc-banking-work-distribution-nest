require('dotenv').config();
import { Sequelize } from 'sequelize-typescript';
import { Customer } from '../customer/customer.model';
import { WorkOrder } from '../work-order/work-order.model';
import { WorkFlowAssignLog } from '../workflow-assign-log/workflow-assign-log.model';
import { Employee } from '../employee/employee.model';
import { EmployeeStats } from '../employee-stats/employee-stats.model';
import PdfData from 'src/pdf-data/pdf-data.model';

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
      sequelize.addModels([
        Customer,
        WorkOrder,
        WorkFlowAssignLog,
        Employee,
        EmployeeStats,
        PdfData,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
