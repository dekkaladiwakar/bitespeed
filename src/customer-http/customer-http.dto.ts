import { IsEmail, IsPhoneNumber, ValidateIf } from 'class-validator';

export class CreateCustomerDto {
  @ValidateIf((o) => !o.email || o.phoneNumber)
  @IsPhoneNumber(null, {
    message:
      'Please provide valid Phone Number with country code. +9199xxxxxx19',
  })
  phoneNumber: string;

  @ValidateIf((o) => !o.phoneNumber || o.email)
  @IsEmail({}, { message: 'Please provide valid Email.' })
  email: string;
}

export class FindCustomerDto {
  @ValidateIf((o) => !o.email || o.phoneNumber)
  @IsPhoneNumber(null, {
    message:
      'Please provide valid Phone Number with country code. +9199xxxxxx19',
  })
  phoneNumber: string;

  @ValidateIf((o) => !o.phoneNumber || o.email)
  @IsEmail({}, { message: 'Please provide valid Email.' })
  email: string;
}
