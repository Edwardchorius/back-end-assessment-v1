import { Injectable } from '@nestjs/common';

interface EmailAddressGeneratedOutput {
  data: {
    id: string;
    value: string;
  }[];
}

interface InputModel {
  name: string;
  value: string;
}
//DO NOT USE eval():
// 1. long expensive variable name lookups
// 2. possible vector of attack by malicious parties
@Injectable()
export class EmailAddressGenerator {
  private readonly EMAIL_ADDRESS_VALIDATOR = `[a-zA-Z0-9!#$%&'*+-/=?^_\`{|}~]+[@][gmail,mail,external]+[.][com,net,eu]+`;
  generateEmailAddress(requestModel: {
    inputs: InputModel[];
    expression: string;
  }): EmailAddressGeneratedOutput {
    const { inputs, expression } = requestModel;
    const result: EmailAddressGeneratedOutput = { data: [] };

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
      const currentInputName = currentExpressionParts[0];

      if (inputsToValues[currentInputName]) {
        const currentInputValue = inputsToValues[currentInputName];

        const currentExpressionCommands = currentExpressionParts[1].split('_');

        const currentCounter = 0;
        const currentValuesOfInput = currentInputValue.split(/ |-/);
        while (currentCounter < currentExpressionCommands.length) {
          const currentCommand = currentExpressionCommands[currentCounter];

          if (currentCommand === 'eachWord') {
          } else if (
            currentCommand === 'lastWord' &&
            currentValuesOfInput.length > 1
          ) {
            //
          } else {
          }

          //after checking from which word to start go ahead and do this manipulation below on the words
          if (currentCommand === 'start') {
          } else if (currentCommand === 'take') {
          }
        }
      }
    }

    //Iterate through the array of inputs and split each value accordingly to form the output

    return { data: [{ id: '', value: '' }] };
  }
}
