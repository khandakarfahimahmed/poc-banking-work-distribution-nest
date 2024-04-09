import { Injectable, Inject } from '@nestjs/common';
import { IReviewerWorkOrder } from './reviewer-work-order.interface';
import { ReviewerWorkOrder } from './reviewer-work-order.model';
import { WorkFlowAssignLog } from '../workflow-assign-log/workflow-assign-log.model';

@Injectable()
export class ReviewerWorkOrderService {
  constructor(
    @Inject('WORKORDER_REPOSITORY')
    private readonly workOrderModel: typeof ReviewerWorkOrder,
    @Inject('WORKFLOW_ASSIGN_LOG_REPOSITORY')
    private readonly workFlowAssignLogModel: typeof WorkFlowAssignLog,
  ) {}
  async createWorkOrder(
    workOrder: IReviewerWorkOrder,
  ): Promise<ReviewerWorkOrder> {
    return this.workOrderModel.create(workOrder);
  }
  async updateStatusReviewer(id: number): Promise<void> {
    await this.workOrderModel.update(
      { status: 'maker', isAssigned: false },
      { where: { id } },
    );
  }
  async updateStatusMaker(id: number): Promise<void> {
    await this.workOrderModel.update(
      { status: 'checker', isAssigned: false },
      { where: { id } },
    );
  }

  async findAllWorkOrder(): Promise<ReviewerWorkOrder[]> {
    return this.workOrderModel.findAll();
  }
  async updateWorkOrder(
    id: number,
    status: string,
    assigned_to: number,
  ): Promise<void> {
    try {
      await this.workOrderModel.update(
        {
          status: status,
          assigned_to: assigned_to,
          start_time: new Date(),
          isAssigned: true,
        },
        { where: { id } },
      );
      console.log(
        `work order updated for task ${id} with assigned_to ${assigned_to}`,
      );
    } catch (error) {
      console.log(`Error updating work order for task ${id}:`, error);
      throw error;
    }
  }
}