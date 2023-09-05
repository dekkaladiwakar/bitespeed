import { Injectable } from '@nestjs/common';
import { CustomerService } from '../customer/customer.service';

@Injectable()
export class CustomerHttpService {
  constructor(private customerService: CustomerService) {}
  findAll() {
    return this.customerService.findAll();
  }
}
