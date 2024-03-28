import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EmployeeRoleService } from './employee-role.service';
import { EmployeeRole } from './employee-role.model';
import { IEmployeeRole } from './employee-role.interface';

@Controller('employee')
export class EmployeeRoleController {
  constructor(private readonly employeeService: EmployeeRoleService) {}
  @Get()
  async getActiveEmployee(): Promise<EmployeeRole[]> {
    return this.employeeService.findActiveEmployee();
  }
}
