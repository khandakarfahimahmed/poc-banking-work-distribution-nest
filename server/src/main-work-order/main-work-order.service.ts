import { Injectable, Inject } from '@nestjs/common';
import { IMainWorkOrder } from './main-work-order.interface';
import { MainWorkOrder } from './main-work-order.model';
import { WorkFlowAssignLog } from '../workflow-assign-log/workflow-assign-log.model';

@Injectable()
export class MainWorkOrderService {
  constructor() {}
}
