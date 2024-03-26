import { WorkOrder } from './work-order.model';

export const workOrderProviders = [
  {
    provide: 'WORKORDER_REPOSITORY',
    useValue: WorkOrder,
  },
];
