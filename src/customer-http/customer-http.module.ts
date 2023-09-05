import { Module } from '@nestjs/common';
import { CustomerHttpService } from './customer-http.service';
import { CustomerHttpController } from './customer-http.controller';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports: [CustomerModule],
  controllers: [CustomerHttpController],
  providers: [CustomerHttpService],
})
export class CustomerHttpModule {}
