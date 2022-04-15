import { Module } from '@nestjs/common';
import { EmailAddressGeneratorController } from './api';
import { EmailAddressGenerator } from './domain';

@Module({
  imports: [],
  controllers: [EmailAddressGeneratorController],
  providers: [EmailAddressGenerator],
})
export class MainModule {}
