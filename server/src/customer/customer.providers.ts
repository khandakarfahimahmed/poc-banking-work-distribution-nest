import { Customer } from './customer.model';
import { WorkOrder } from '../work-order/work-order.model';

export const customerProviders = [
  {
    provide: 'CUSTOMER_REPOSITORY',
    useValue: Customer,
  },
  {
    provide: 'WORKORDER_REPOSITORY',
    useValue: WorkOrder,
  },
];
