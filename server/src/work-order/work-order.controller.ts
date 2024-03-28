import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { WorkOrderService } from './work-order.service';
import { IWorkOrder } from './work-order.interface';
import { EmployeeRoleService } from 'src/employee-role/employee-role.service';
import { IEmployeeRole } from 'src/employee-role/employee-role.interface';

@Controller('work-order')
export class WorkOrderController {
  constructor(
    private readonly workOrderService: WorkOrderService,
    private readonly employeeService: EmployeeRoleService,
  ) {}
  @Post('update-status/reviewer')
  async updateStatusreviewer(
    @Body()
    updateData: {
      id: number;
    },
  ): Promise<IWorkOrder[]> {
    const { id } = updateData;
    if (!id) {
      throw new HttpException('id must be provided', HttpStatus.BAD_REQUEST);
    }
    await this.workOrderService.updateStatusReviewer(id);
    return this.workOrderService.findAllWorkOrder();
  }
  @Post('update-status/maker')
  async updateStatusmaker(
    @Body()
    updateData: {
      id: number;
    },
  ): Promise<IWorkOrder[]> {
    const { id } = updateData;
    if (!id) {
      throw new HttpException('id must be provided', HttpStatus.BAD_REQUEST);
    }
    await this.workOrderService.updateStatusMaker(id);
    return this.workOrderService.findAllWorkOrder();
  }
}
