import { Module } from '@nestjs/common';
import { EmailAddressGeneratorController } from './EmailAddressGeneratorController';
import { EmailAddressGenerator } from './EmailAddressGenerator';

@Module({
  imports: [],
  controllers: [EmailAddressGeneratorController],
  providers: [EmailAddressGenerator],
})
export class MainModule {}
