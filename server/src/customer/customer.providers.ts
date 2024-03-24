import { Customer } from './models/customer.model';
import { WorkOrder } from './models/work-order.model';
import { WorkFlowAssignLog } from './models/workflow-assign-log.model';

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
];
