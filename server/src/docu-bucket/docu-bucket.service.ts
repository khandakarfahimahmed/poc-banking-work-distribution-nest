import { Injectable, Inject } from '@nestjs/common';
import { IPdfList } from './docu-bucket.interface';
import { PdfList } from './docu-bucket.model';

@Injectable()
export class PdfListService {
  constructor(
    @Inject('PDF_List_REPOSITORY')
    private readonly pdflistModel: typeof PdfList,
  ) {}

  async postPdf(pdf: IPdfList): Promise<any> {
    return await this.pdflistModel.create(pdf);
  }
}
