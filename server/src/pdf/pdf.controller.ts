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
import { IPdf } from './pdf.interface';
import { PdfService } from './pdf.service';
@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Post()
  async addPdf(@Body() pdf: IPdf): Promise<any> {
    return await this.pdfService.addPdf(pdf);
  }
}
