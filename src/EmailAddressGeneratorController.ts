import { Controller, Post, Body } from '@nestjs/common';
import { EmailAddressGenerator } from './EmailAddressGenerator';

interface EmailAddressGeneratedResponse {
  data: {
    id: string;
    value: string;
  }[];
}

interface InputRequestModel {
  name: string;
  value: string;
}

interface InputsRequestModel {
  inputs: InputRequestModel[];
  expression: string;
}

@Controller('email-generation')
export class EmailAddressGeneratorController {
  constructor(private readonly emailAddressGenerator: EmailAddressGenerator) {}

  @Post('address')
  getHello(
    @Body() inputsRequest: InputsRequestModel,
  ): EmailAddressGeneratedResponse {
    return this.emailAddressGenerator.generateEmailAddress(inputsRequest);
  }
}
