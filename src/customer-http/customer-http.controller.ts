import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CustomerHttpService } from './customer-http.service';
import { CreateCustomerDto, FindCustomerDto } from './customer-http.dto';
import { AlwaysBlockGuard } from '../common/guards/block.guard';

@Controller('customer')
@UsePipes(ValidationPipe)
export class CustomerHttpController {
  constructor(private readonly customerHttpService: CustomerHttpService) {}

  @Post('add')
  createOrUpdateCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerHttpService.createOrUpdateCustomer(createCustomerDto);
  }

  @Post('find')
  getCustomerDetails(@Body() findCustomerDto: FindCustomerDto) {
    return this.customerHttpService.getCustomerDetails(findCustomerDto);
  }

  @UseGuards(AlwaysBlockGuard)
  @Get('all')
  findAll() {
    return this.customerHttpService.findAll();
  }
}
