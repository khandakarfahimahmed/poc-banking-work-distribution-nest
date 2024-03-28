export interface ICustomer {
  name: string;
  nid_no: number;
  phone: number;
  address: string;
  email: string;
  tin_no: string;
  birth_certificate_no: number;
  account_type: string;
}

export interface ICustomerAccountNo {
  acc_id: number;
  customer_id: number;
}
