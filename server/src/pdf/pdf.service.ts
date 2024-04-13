import { Injectable, Inject } from '@nestjs/common';
import { IPdf } from './pdf.interface';
import { Pdf } from './pdf.model';

@Injectable()
export class PdfService {
  constructor() {}
  async addPdf(pdf: IPdf): Promise<any> {
    return await Pdf.create(pdf);
  }
  async findAllPdfName(): Promise<any> {
    try {
      const pdfs = await Pdf.findAll();
      return pdfs.map((pdf: IPdf) => pdf.pdf_name);
    } catch (error) {
      throw new Error('Error fetching PDF names');
    }
  }
}
