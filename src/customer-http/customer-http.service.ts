import { Injectable } from '@nestjs/common';
import { CustomerService } from '../customer/customer.service';
import { CreateCustomerDto } from './customer-http.dto';

@Injectable()
export class CustomerHttpService {
  constructor(private customerService: CustomerService) {}
  createOrUpdateCustomer(createCustomerDto: CreateCustomerDto) {
    return this.customerService.createOrUpdateCustomer(
      createCustomerDto.email,
      createCustomerDto.phoneNumber,
    );
  }

  findAll() {
    return this.customerService.findAll();
  }
}
