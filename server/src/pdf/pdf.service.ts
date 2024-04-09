import { Injectable, Inject } from '@nestjs/common';
import { IPdf } from './pdf.interface';
import { Pdf } from './pdf.model';

@Injectable()
export class PdfService {
  constructor() {}
}
