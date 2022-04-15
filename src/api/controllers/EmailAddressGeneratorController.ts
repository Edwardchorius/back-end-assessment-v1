import { Controller, Post, Body } from '@nestjs/common';
import { EmailAddressGenerator } from '../../domain/services/EmailAddressGenerator';
import {
  EmailAddressGeneratedResponse,
  EmailAddressGenerationRequest,
} from '../models';

@Controller('email-generation')
export class EmailAddressGeneratorController {
  constructor(private readonly emailAddressGenerator: EmailAddressGenerator) {}

  @Post('address')
  getHello(
    @Body() inputsRequest: EmailAddressGenerationRequest,
  ): EmailAddressGeneratedResponse {
    return this.emailAddressGenerator.generateEmailAddress(inputsRequest);
  }
}
