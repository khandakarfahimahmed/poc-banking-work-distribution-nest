import { Customer, CustomerAccountList } from './customer.model';

import { Pdf } from 'src/pdf/pdf.model';

import { DocuBucket } from 'src/docu-bucket/docu-bucket.model';
export const customerProviders = [
  {
    provide: 'CUSTOMER_REPOSITORY',
    useValue: Customer,
  },

  {
    provide: 'CUSTOMER_ACCOUNT_REPOSITORY',
    useValue: CustomerAccountList,
  },

  {
    provide: 'PDF_REPOSITORY',
    useValue: Pdf,
  },

  {
    provide: 'DOCUBUCKET_REPOSITORY',
    useValue: DocuBucket,
  },
];
