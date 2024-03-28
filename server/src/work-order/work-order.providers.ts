import { WorkOrder } from './work-order.model';
import { WorkFlowAssignLog } from '../workflow-assign-log/workflow-assign-log.model';
import { EmployeeRole } from '../employee-role/employee-role.model';

export const workOrderProviders = [
  {
    provide: 'WORKORDER_REPOSITORY',
    useValue: WorkOrder,
  },
  {
    provide: 'WORKFLOW_ASSIGN_LOG_REPOSITORY',
    useValue: WorkFlowAssignLog,
  },
  {
    provide: 'EMPLOYEE_ROLE_REPOSITORY',
    useValue: EmployeeRole,
  },
];
