import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CustomerService } from './customer.service';

import { FilesInterceptor } from '@nestjs/platform-express';
import { ICustomer } from './customer.interface';
import { convertPDFBufferToImagesAndUpload } from 'src/pdf-data/pdf.middleware';
import { PdfDataService } from 'src/pdf-data/pdf-data.service';
import { IPdfData } from 'src/pdf-data/pdf-data.interface';
import { PdfListService } from 'src/docu-bucket/docu-bucket.service';

@Controller('customer')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,

    private readonly pdfDataService: PdfDataService,
    private readonly pdfListService: PdfListService,
  ) {}
  @Get()
  async getAllCustomer(): Promise<ICustomer[]> {
    return this.customerService.findAllCustomer();
  }

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async postCustomer(
    @Body() customer: ICustomer,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<ICustomer> {
    const existingCustomer = await this.customerService.findByNid(
      customer.nid_no,
    );
    let nextAccId = 0;
    const maxId = await this.customerService.findMaxAccId();

    nextAccId = maxId + 1;
    if (existingCustomer) {
      await this.customerService.createAccList({
        acc_id: nextAccId,
        customer_id: existingCustomer.id,
        acc_type: 'personal',
        status: 'need approval',
      });
      const pdfData: IPdfData = {
        acc_id: nextAccId,
        customer_id: existingCustomer.id,
        pdf_1: [],
        pdf_2: [],
        pdf_3: [],
        pdf_4: [],
      };
      for (const file of files) {
        // For example, you can save each file to the server or process it in some other way
        // For demonstration purposes, let's log the filename and its size
        console.log(
          `Received file: ${file.originalname}, size: ${file.size} bytes`,
        );
      }
      if (files && files.length > 0) {
        for (let i = 0; i < Math.min(files.length, 4); i++) {
          pdfData[`pdf_${i + 1}`] = await convertPDFBufferToImagesAndUpload(
            files[i].buffer,
          );
        }
        this.pdfDataService.postPdf(pdfData);
      }
      throw new HttpException(
        { message: 'NID number already exists', existingCustomer },
        HttpStatus.BAD_REQUEST,
      );
    }

    const createdCustomer = await this.customerService.create(customer);
    await this.customerService.createAccList({
      acc_id: nextAccId,
      customer_id: createdCustomer.id,
      acc_type: 'personal',
      status: 'need approval',
    });
    const pdfData: IPdfData = {
      acc_id: 1,
      customer_id: createdCustomer.id,
      pdf_1: [],
      pdf_2: [],
      pdf_3: [],
      pdf_4: [],
    };

    if (files && files.length > 0) {
      for (let i = 0; i < Math.min(files.length, 4); i++) {
        pdfData[`pdf_${i + 1}`] = await convertPDFBufferToImagesAndUpload(
          files[i].buffer,
        );
      }
      this.pdfDataService.postPdf(pdfData);
    }
    return createdCustomer;
  }

  @Get('search')
  async getCustomer(
    @Body() searchData: { nid_no?: number; phone?: number },
  ): Promise<ICustomer> {
    const { nid_no, phone } = searchData;

    if (!nid_no && !phone) {
      throw new HttpException(
        'Either nid_no or phone must be provided',
        HttpStatus.BAD_REQUEST,
      );
    }

    let customer: ICustomer;

    if (nid_no) {
      customer = await this.customerService.findByNid(nid_no);
    } else {
      customer = await this.customerService.findByPhone(phone);
    }

    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }

    return customer;
  }
}
