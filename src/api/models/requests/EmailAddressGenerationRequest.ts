export interface EmailAddressGenerationRequest {
  inputs: InputRequestModel[];
  expression: string;
}

interface InputRequestModel {
  name: string;
  value: string;
}
