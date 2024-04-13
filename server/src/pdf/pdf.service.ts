import { Injectable, Inject } from '@nestjs/common';
import { IPdf } from './pdf.interface';
import { Pdf } from './pdf.model';

@Injectable()
export class PdfService {
  constructor() {}
  async addPdf(pdf: IPdf): Promise<any> {
    return await Pdf.create(pdf);
  }
}
