import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFiles,
  UseInterceptors,
  Bind,
} from '@nestjs/common';
import { PdfListService } from './docu-bucket.service';
import { IPdfList } from './docu-bucket.interface';
@Controller('pdf-list')
export class PdfListController {
  constructor(private readonly pdfService: PdfListService) {}
}
