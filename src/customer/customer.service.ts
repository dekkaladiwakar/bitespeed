import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async createOrUpdateCustomer(
    email: string,
    phoneNumber: string,
  ): Promise<Customer> {
    // First, search for primary customers
    const existingPrimaryCustomer = await this.customerRepository.findOne({
      where: [
        { email, linkPrecedence: 'primary' },
        { phoneNumber, linkPrecedence: 'primary' },
      ],
    });

    if (existingPrimaryCustomer) {
      return this.customerRepository.save({
        email,
        phoneNumber,
        linkedId: existingPrimaryCustomer.id,
        linkPrecedence: 'secondary',
      });
    } else {
      // If no primary customers are found, run a more general search
      const existingCustomers = await this.customerRepository.find({
        where: [{ email }, { phoneNumber }],
      });

      let primaryId = null;

      for (const customer of existingCustomers) {
        if (customer.linkedId) {
          primaryId = customer.linkedId;
          break;
        }
      }

      if (primaryId) {
        return this.customerRepository.save({
          email,
          phoneNumber,
          linkedId: primaryId,
          linkPrecedence: 'secondary',
        });
      } else {
        return this.customerRepository.save({
          email,
          phoneNumber,
          linkPrecedence: 'primary',
        });
      }
    }
  }

  findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }
}
