import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { EmailAddressGenerator } from '../../domain/services/EmailAddressGenerator';
import {
  EmailAddressGeneratedResponse,
  EmailAddressGenerationRequest,
} from '../models';

@Controller('email-generation')
export class EmailAddressGeneratorController {
  constructor(private readonly emailAddressGenerator: EmailAddressGenerator) {}

  @Post('address')
  @HttpCode(201)
  getHello(
    @Body() inputsRequest: EmailAddressGenerationRequest,
  ): EmailAddressGeneratedResponse | { message: string } {
    try {
      const generatedEmailAddress =
        this.emailAddressGenerator.generateEmailAddress(inputsRequest);
      return generatedEmailAddress;
    } catch (e) {
      console.log(`${JSON.stringify(e)}`);
      return {
        message: `Failed to generate email address: ${JSON.stringify(
          e.message,
        )}`,
      };
    }
  }
}
