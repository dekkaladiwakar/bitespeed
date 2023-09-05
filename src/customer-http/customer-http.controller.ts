import { Controller, Get } from '@nestjs/common';
import { CustomerHttpService } from './customer-http.service';

@Controller('customer')
export class CustomerHttpController {
  constructor(private readonly customerHttpService: CustomerHttpService) {}

  @Get('all')
  async findAll() {
    return this.customerHttpService.findAll();
  }
}
