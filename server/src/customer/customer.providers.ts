import { Customer } from './models/customer.model';
import { WorkOrder } from './models/work-order.model';
import { WorkFlowAssignLog } from './models/workflow-assign-log.model';
import { Employee } from './models/employee.model';
import { EmployeeStats } from './models/employee-stats.model';

export const customerProviders = [
  {
    provide: 'CUSTOMER_REPOSITORY',
    useValue: Customer,
  },
  {
    provide: 'WORKORDER_REPOSITORY',
    useValue: WorkOrder,
  },
  {
    provide: 'WORKFLOW_ASSIGN_LOG_REPOSITORY',
    useValue: WorkFlowAssignLog,
  },
  {
    provide: 'EMPLOYEE_REPOSITORY',
    useValue: Employee,
  },
  {
    provide: 'EMPLOYEE_STATS_REPOSITORY',
    useValue: EmployeeStats,
  },
];
