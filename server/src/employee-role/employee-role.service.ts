import { Injectable, Inject } from '@nestjs/common';
import { EmployeeRole } from './employee-role.model';
import { IEmployeeRole } from './employee-role.interface';

@Injectable()
export class EmployeeRoleService {
  constructor(
    @Inject('EMPLOYEE_ROLE_REPOSITORY')
    private readonly employeeModel: typeof EmployeeRole,
  ) {}
  async findActiveEmployee(): Promise<EmployeeRole[]> {
    return;
  }
}
