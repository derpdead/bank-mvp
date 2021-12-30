/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateBankInput = {
  id?: string | null,
  cognitoId: string,
  countryCode: string,
  service: string,
  username: string,
  password: string,
  accountId: string,
};

export type ModelBankConditionInput = {
  cognitoId?: ModelStringInput | null,
  countryCode?: ModelStringInput | null,
  service?: ModelStringInput | null,
  username?: ModelStringInput | null,
  password?: ModelStringInput | null,
  accountId?: ModelStringInput | null,
  and?: Array< ModelBankConditionInput | null > | null,
  or?: Array< ModelBankConditionInput | null > | null,
  not?: ModelBankConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Bank = {
  __typename: "Bank",
  id: string,
  cognitoId: string,
  countryCode: string,
  service: string,
  username: string,
  password: string,
  accountId: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateBankInput = {
  id: string,
  cognitoId?: string | null,
  countryCode?: string | null,
  service?: string | null,
  username?: string | null,
  password?: string | null,
  accountId?: string | null,
};

export type DeleteBankInput = {
  id: string,
};

export type ModelBankFilterInput = {
  id?: ModelIDInput | null,
  cognitoId?: ModelStringInput | null,
  countryCode?: ModelStringInput | null,
  service?: ModelStringInput | null,
  username?: ModelStringInput | null,
  password?: ModelStringInput | null,
  accountId?: ModelStringInput | null,
  and?: Array< ModelBankFilterInput | null > | null,
  or?: Array< ModelBankFilterInput | null > | null,
  not?: ModelBankFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelBankConnection = {
  __typename: "ModelBankConnection",
  items:  Array<Bank | null >,
  nextToken?: string | null,
};

export type CreateBankMutationVariables = {
  input: CreateBankInput,
  condition?: ModelBankConditionInput | null,
};

export type CreateBankMutation = {
  createBank?:  {
    __typename: "Bank",
    id: string,
    cognitoId: string,
    countryCode: string,
    service: string,
    username: string,
    password: string,
    accountId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateBankMutationVariables = {
  input: UpdateBankInput,
  condition?: ModelBankConditionInput | null,
};

export type UpdateBankMutation = {
  updateBank?:  {
    __typename: "Bank",
    id: string,
    cognitoId: string,
    countryCode: string,
    service: string,
    username: string,
    password: string,
    accountId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteBankMutationVariables = {
  input: DeleteBankInput,
  condition?: ModelBankConditionInput | null,
};

export type DeleteBankMutation = {
  deleteBank?:  {
    __typename: "Bank",
    id: string,
    cognitoId: string,
    countryCode: string,
    service: string,
    username: string,
    password: string,
    accountId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetBankQueryVariables = {
  id: string,
};

export type GetBankQuery = {
  getBank?:  {
    __typename: "Bank",
    id: string,
    cognitoId: string,
    countryCode: string,
    service: string,
    username: string,
    password: string,
    accountId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListBanksQueryVariables = {
  filter?: ModelBankFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListBanksQuery = {
  listBanks?:  {
    __typename: "ModelBankConnection",
    items:  Array< {
      __typename: "Bank",
      id: string,
      cognitoId: string,
      countryCode: string,
      service: string,
      username: string,
      password: string,
      accountId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateBankSubscription = {
  onCreateBank?:  {
    __typename: "Bank",
    id: string,
    cognitoId: string,
    countryCode: string,
    service: string,
    username: string,
    password: string,
    accountId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateBankSubscription = {
  onUpdateBank?:  {
    __typename: "Bank",
    id: string,
    cognitoId: string,
    countryCode: string,
    service: string,
    username: string,
    password: string,
    accountId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteBankSubscription = {
  onDeleteBank?:  {
    __typename: "Bank",
    id: string,
    cognitoId: string,
    countryCode: string,
    service: string,
    username: string,
    password: string,
    accountId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
