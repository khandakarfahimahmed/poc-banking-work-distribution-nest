import { Customer, CustomerAccountList } from './customer.model';
import { WorkOrder } from '../reviewer-work-order/reviewer-work-order.model';
import { PdfData } from '../pdf-data/pdf-data.model';

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
    provide: 'PDF_DATA_REPOSITORY',
    useValue: PdfData,
  },
  {
    provide: 'CUSTOMER_ACCOUNT_REPOSITORY',
    useValue: CustomerAccountList,
  },
];
