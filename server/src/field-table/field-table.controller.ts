import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFiles,
  UseInterceptors,
  Bind,
} from '@nestjs/common';
import { PdfDataController } from 'src/pdf-data/pdf-data.controller';
import { IFieldTable } from './field-table.interface';
import { FieldTableService } from './field-table.service';
@Controller('feild-data')
export class FieldTableController {
  constructor(private readonly fieldTableService: FieldTableService) {}
}
