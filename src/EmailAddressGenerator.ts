import { Injectable } from '@nestjs/common';

interface EmailAddressGeneratedOutput {
  data: {
    id: string;
    value: string;
  }[];
}
//DO NOT USE eval():
// 1. long expensive variable name lookups
// 2. possible vector of attack by malicious parties
@Injectable()
export class EmailAddressGenerator {
  generateEmailAddress(
    inputs: string[],
    expression: string,
  ): EmailAddressGeneratedOutput {
    const groupedInputsArray: { name: string; value: string }[] = [];
    let finalOutput: EmailAddressGeneratedOutput;
    inputs.map((currentInput, currentIndex) => {
      const currentGroupedInput = {
        name: 'input' + currentIndex + 1,
        value: currentInput,
      };
      groupedInputsArray.push(currentGroupedInput);
    });

    const expressionParts = expression.split('~');

    return { data: [{ id: '', value: '' }] };
  }
}
