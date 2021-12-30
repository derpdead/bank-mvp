/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBank = /* GraphQL */ `
  mutation CreateBank(
    $input: CreateBankInput!
    $condition: ModelBankConditionInput
  ) {
    createBank(input: $input, condition: $condition) {
      id
      cognitoId
      countryCode
      service
      username
      password
      accountId
      createdAt
      updatedAt
    }
  }
`;
export const updateBank = /* GraphQL */ `
  mutation UpdateBank(
    $input: UpdateBankInput!
    $condition: ModelBankConditionInput
  ) {
    updateBank(input: $input, condition: $condition) {
      id
      cognitoId
      countryCode
      service
      username
      password
      accountId
      createdAt
      updatedAt
    }
  }
`;
export const deleteBank = /* GraphQL */ `
  mutation DeleteBank(
    $input: DeleteBankInput!
    $condition: ModelBankConditionInput
  ) {
    deleteBank(input: $input, condition: $condition) {
      id
      cognitoId
      countryCode
      service
      username
      password
      accountId
      createdAt
      updatedAt
    }
  }
`;
