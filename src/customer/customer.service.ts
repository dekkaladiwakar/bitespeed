import { Injectable, NotFoundException } from '@nestjs/common';
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
    // First, search for primary contacts
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
      // If no primary contacts are found, run a more general search
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

  async getCustomerDetails(email: string, phoneNumber: string): Promise<any> {
    let rootPrimaryContact: any;

    // Find the contact based on email or phone number
    const initialContact = await this.customerRepository
      .createQueryBuilder('customer')
      .where('customer.email = :email OR customer.phoneNumber = :phoneNumber', {
        email,
        phoneNumber,
      })
      .andWhere('customer.deletedAt IS NULL')
      .getOne();

    if (!initialContact) {
      throw new NotFoundException('Contact not found');
    }

    // Determine if this contact is a primary or linked to another primary contact
    if (initialContact.linkPrecedence === 'primary') {
      rootPrimaryContact = initialContact;
    } else {
      rootPrimaryContact = await this.customerRepository.findOne({
        where: { id: initialContact.linkedId },
      });
    }

    // Find the secondary contacts
    const secondaryContacts = await this.customerRepository
      .createQueryBuilder('customer')
      .select(['customer.id', 'customer.email', 'customer.phoneNumber'])
      .where('customer.linkedId = :linkedId', {
        linkedId: rootPrimaryContact.id,
      })
      .andWhere('customer.deletedAt IS NULL')
      .getMany();

    // Format the response
    const response = {
      contact: {
        primaryContactId: rootPrimaryContact.id,
        emails: [
          rootPrimaryContact.email,
          ...secondaryContacts.map((c) => c.email).filter((e) => e),
        ],
        phoneNumbers: [
          rootPrimaryContact.phoneNumber,
          ...secondaryContacts.map((c) => c.phoneNumber).filter((p) => p),
        ],
        secondaryContactIds: secondaryContacts.map((c) => c.id),
      },
    };

    return response;
  }
}
