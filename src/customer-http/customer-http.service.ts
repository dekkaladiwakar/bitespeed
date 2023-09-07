import { Injectable } from '@nestjs/common';
import { CustomerService } from '../customer/customer.service';
import { CreateCustomerDto, FindCustomerDto } from './customer-http.dto';

@Injectable()
export class CustomerHttpService {
  constructor(private customerService: CustomerService) {}
  createOrUpdateCustomer(createCustomerDto: CreateCustomerDto) {
    return this.customerService.createOrUpdateCustomer(
      createCustomerDto.email,
      createCustomerDto.phoneNumber,
    );
  }

  getCustomerDetails(findCustomerDto: FindCustomerDto) {
    return this.customerService.getCustomerDetails(
      findCustomerDto.email,
      findCustomerDto.phoneNumber,
    );
  }

  findAll() {
    return this.customerService.findAll();
  }
}
