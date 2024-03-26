import { WorkFlowAssignLog } from './workflow-assign-log.model';
import { WorkflowAssignLogController } from './workflow-assign-log.controller';
import { workOrderProviders } from '../work-order/work-order.providers';
import { WorkOrder } from '../work-order/work-order.model';

export const workFlowAssignLogProviders = [
  {
    provide: 'WORKFLOW_ASSIGN_LOG_REPOSITORY',
    useValue: WorkFlowAssignLog,
  },
  {
    provide: 'WORKORDER_REPOSITORY',
    useValue: WorkOrder,
  },
];
