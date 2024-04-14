import { Injectable, Inject } from '@nestjs/common';
import { IReviewerWorkOrder } from './reviewer-work-order.interface';
import { ReviewerWorkOrder } from './reviewer-work-order.model';
import { WorkFlowAssignLog } from '../workflow-assign-log/workflow-assign-log.model';

@Injectable()
export class ReviewerWorkOrderService {
  constructor(
    @Inject('REVIEWER_WORK_ORDER_REPOSITORY')
    private readonly reviewerWorkOrderModel: typeof ReviewerWorkOrder,
  ) {}
  async createReviewerWorkOrder(
    revWorkOrder: IReviewerWorkOrder,
  ): Promise<ReviewerWorkOrder> {
    return this.reviewerWorkOrderModel.create(revWorkOrder);
  }
  async updateStatusReviewer(id: number): Promise<void> {
    await this.reviewerWorkOrderModel.update(
      { status: 'maker', isAssigned: false },
      { where: { id } },
    );
  }
  async updateStatusMaker(id: number): Promise<void> {
    await this.reviewerWorkOrderModel.update(
      { status: 'checker', isAssigned: false },
      { where: { id } },
    );
  }

  async findAllWorkOrder(): Promise<ReviewerWorkOrder[]> {
    return this.reviewerWorkOrderModel.findAll();
  }
  async updateReviewerWorkOrder(
    id: number,
    status: string,
    assigned_to: number,
  ): Promise<void> {
    try {
      await this.reviewerWorkOrderModel.update(
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
