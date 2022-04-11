import { Controller, Get, Query } from '@nestjs/common';
import { EmailAddressGenerator } from './EmailAddressGenerator';

interface EmailAddressGeneratedResponse {
  data: {
    id: string;
    value: string;
  }[];
}

@Controller()
export class EmailAddressGeneratorController {
  constructor(private readonly emailAddressGenerator: EmailAddressGenerator) {}

  @Get()
  getHello(
    @Query('inputs') inputs: string[],
    @Query('expression') expression: string,
  ): EmailAddressGeneratedResponse {
    return this.emailAddressGenerator.generateEmailAddress(inputs, expression);
  }
}
