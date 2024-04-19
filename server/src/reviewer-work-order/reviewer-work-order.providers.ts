import { ReviewerWorkOrder } from './reviewer-work-order.model';
import { WorkFlowAssignLog } from '../workflow-assign-log/workflow-assign-log.model';
import { Employee } from '../employee/employee.model';

export const reviewerWorkOrderProviders = [
  {
    provide: 'REVIEWER_WORK_ORDER_REPOSITORY',
    useValue: ReviewerWorkOrder,
  },
  {
    provide: 'WORKFLOW_ASSIGN_LOG_REPOSITORY',
    useValue: WorkFlowAssignLog,
  },
  {
    provide: 'EMPLOYEE_REPOSITORY',
    useValue: Employee,
  },
];
