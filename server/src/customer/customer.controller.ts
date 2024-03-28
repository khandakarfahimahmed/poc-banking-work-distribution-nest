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
import { WorkOrderService } from '../work-order/work-order.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ICustomer } from './customer.interface';
import { convertPDFBufferToImagesAndUpload } from 'src/pdf-data/pdf.middleware';
import { PdfDataService } from 'src/pdf-data/pdf-data.service';
import { IPdfData } from 'src/pdf-data/pdf-data.interface';

@Controller('customer')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly workOrderService: WorkOrderService,
    private readonly pdfDataService: PdfDataService,
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
    if (existingCustomer) {
      throw new HttpException(
        'NID number already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const createdCustomer = await this.customerService.create(customer);
    await this.workOrderService.createWorkOrder({
      acc_id: null,
      customer_id: null,
      type: 'Account opening',
      acc_type: 'personal',
      status: 'reviewer',
      assigned_to: null,
      start_time: null,
      isAssigned: false,
    });
    const pdfData: IPdfData = {
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
