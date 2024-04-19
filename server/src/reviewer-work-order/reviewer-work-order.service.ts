import { Injectable, Inject } from '@nestjs/common';
import { IReviewerWorkOrder } from './reviewer-work-order.interface';
import { ReviewerWorkOrder } from './reviewer-work-order.model';
import { WorkFlowAssignLog } from '../workflow-assign-log/workflow-assign-log.model';
import Employee from 'src/employee/employee.model';

@Injectable()
export class ReviewerWorkOrderService {
  constructor(
    @Inject('REVIEWER_WORK_ORDER_REPOSITORY')
    private readonly reviewerWorkOrderModel: typeof ReviewerWorkOrder,
    @Inject('WORKFLOW_ASSIGN_LOG_REPOSITORY')
    private readonly workFlowAssignLogModel: typeof WorkFlowAssignLog,
    @Inject('EMPLOYEE_REPOSITORY')
    private readonly employeeModel: typeof Employee,
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
}
