import { EmailAddressGenerationInput, EmailAddressGenerator } from '../domain';

describe('EmailAddressGenerator should', () => {
  it('return output containing the generated address based on business logic', () => {
    //Arrange
    const mockRequestModel = {
      inputs: [
        {
          name: 'input1',
          value: 'Jean-Louis',
        },
        {
          name: 'input2',
          value: 'Jean-Charles Mignard',
        },
        {
          name: 'input3',
          value: '@',
        },
        {
          name: 'input4',
          value: 'external',
        },
        {
          name: 'input5',
          value: 'gmail',
        },
        {
          name: 'input6',
          value: 'com',
        },
      ] as EmailAddressGenerationInput[],
      expression:
        'input1|eachWord_start0_take3~input2|lastWords1_start3_take1~input3|@~input4|*~input5|*',
    };

    //Act
    const sut = new EmailAddressGenerator();
    const result = sut.generateEmailAddress(mockRequestModel);
    console.log(sut);
    //Assert
    expect(result).toHaveProperty('data');
    expect(result.data[0]).toHaveProperty('id');
    expect(result.data[0]).toHaveProperty('value');
    expect(result.data[0].value).not.toBeUndefined();
  });
});
