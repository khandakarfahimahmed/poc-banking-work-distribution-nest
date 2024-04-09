import { Module } from '@nestjs/common';
import { PdfListService } from './docu-bucket.service';
import { PdfListController } from './docu-bucket.controller';
import { DatabaseModule } from 'src/database/database.module';
import { pdfListProviders } from './docu-bucket.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PdfListController],
  providers: [PdfListService, ...pdfListProviders],
})
export class PdfListModule {}
