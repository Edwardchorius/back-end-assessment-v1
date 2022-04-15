import { Injectable } from '@nestjs/common';
import {
  EmailAddressGeneratedOutput,
  EmailAddressGenerationInput,
} from '../models';

//DO NOT USE eval():
// 1. long expensive variable name lookups
// 2. possible vector of attack by malicious parties
@Injectable()
export class EmailAddressGenerator {
  generateEmailAddress(requestModel: {
    inputs: EmailAddressGenerationInput[];
    expression: string;
  }): EmailAddressGeneratedOutput {
    const { inputs, expression } = requestModel;
    const resultEmailAddress: string[] = [];

    const inputsToValues = inputs.reduce((acc, currentInput) => {
      return {
        ...acc,
        [currentInput.name]: currentInput.value,
      };
    }, {}) as Record<string, string>;

    const expressionParts = expression.split('~');

    for (let i = 0; i < expressionParts.length; i++) {
      const currentExpression = expressionParts[i];

      const currentExpressionParts = currentExpression.split('|');
      const commands = currentExpressionParts[1].split('_');

      const currentInputName = currentExpressionParts[0];
      const currentInputValue = inputsToValues[currentInputName];

      if (currentInputValue.includes('+')) {
        continue;
      }

      if (currentExpressionParts[1].includes('eachWord')) {
        const inputValueParts = currentInputValue.split(/-| /);

        const valueToPush = this.mapCharsFromWords(
          commands,
          inputValueParts,
          0,
        );

        resultEmailAddress.push(valueToPush);
        resultEmailAddress.push('.');
        //Skip the rest of the logic as we already completed the current iteration with input
        continue;
      }

      if (currentExpressionParts[1].includes('lastWords')) {
        const inputValueParts = currentInputValue.split(/-| /);

        const valueToPush = this.mapCharsFromWords(
          commands,
          inputValueParts,
          1,
        );

        resultEmailAddress.push(valueToPush);
        resultEmailAddress.push('.');
        //Skip the rest of the logic as we already completed the current iteration with input
        continue;
      }

      if (
        currentExpressionParts[1].includes('@') &&
        !resultEmailAddress.includes('@')
      ) {
        if (resultEmailAddress[resultEmailAddress.length - 1] === '.') {
          resultEmailAddress.pop();
        }

        resultEmailAddress.push('@');
        continue;
      }

      if (
        currentExpressionParts[1].length === 1 &&
        currentExpressionParts[1] === '*'
      ) {
        if (i !== expressionParts.length - 1) {
          resultEmailAddress.push(currentInputValue + '.');
        } else {
          resultEmailAddress.push(currentInputValue);
        }
        continue;
      }
    }

    const finalOutput = resultEmailAddress.join('').toLowerCase();

    return { data: [{ id: finalOutput, value: finalOutput }] };
  }

  private mapCharsFromWords(
    commands: string[],
    inputValueParts: string[],
    startingIndex = 0,
  ): string {
    let output = '';
    for (let j = startingIndex; j < inputValueParts.length; j++) {
      const inputValueForMapping = inputValueParts[j];

      //TODO What if the start index or take count is bigger than 9 ? This logic below might be missing out certain digits
      const startIndex = Number(commands[1].substring(commands[1].length - 1));
      const takeCount = Number(commands[2].substring(commands[2].length - 1));

      output = output + inputValueForMapping.substring(startIndex, takeCount);
    }
    return output;
  }
}
