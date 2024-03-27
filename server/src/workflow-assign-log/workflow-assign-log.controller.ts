import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { WorkFlowAssignLogService } from './workflow-assign-log.service';
import { IWorkFlowAssignLog } from './workflow-assign-log.interface';

@Controller('workflow-assign')
export class WorkflowAssignLogController {
  constructor(
    private readonly workFlowAssignLogService: WorkFlowAssignLogService,
  ) {}
  // @Get('assign-task')
  // async assignTask(): Promise<any> {
  //   return this.workFlowAssignLogService.distributeTask();
  // }
}
