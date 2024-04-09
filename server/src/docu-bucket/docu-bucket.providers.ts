import { PdfList } from './docu-bucket.model';

export const pdfListProviders = [
  {
    provide: 'PDF_List_REPOSITORY',
    useValue: PdfList,
  },
];
