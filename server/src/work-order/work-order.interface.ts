export interface IWorkOrder {
  id?: number;
  acc_id: number | null;
  customer_id: number;
  type: string;
  acc_type: string;
  status: string;
  assigned_to: number;
  start_time: Date;
  isAssigned: boolean;
  estimated_time?: number;
}
