export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  meUser: User;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  confirmed: Scalars['Boolean'];
  preferredLanguage: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  loginAuth: AccessTokenAuthResponse;
  refreshTokenAuth: AccessTokenAuthResponse;
  logoutAuth: Scalars['Boolean'];
  registerUser: User;
  confirmEmailUser: User;
};

export type MutationLoginAuthArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type MutationRegisterUserArgs = {
  data: RegisterUserInput;
};

export type MutationConfirmEmailUserArgs = {
  token: Scalars['String'];
};

export type AccessTokenAuthResponse = {
  __typename?: 'AccessTokenAuthResponse';
  accessToken: Scalars['String'];
  expiresIn: Scalars['Int'];
};

export type RegisterUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  /** User's preferred language. */
  preferredLanguage?: Maybe<Language>;
};

/** Languages of application */
export enum Language {
  Cs = 'cs',
  En = 'en'
}

export type RegisterUserMutationVariables = Exact<{
  data: RegisterUserInput;
}>;

export type RegisterUserMutation = { __typename?: 'Mutation' } & {
  registerUser: { __typename?: 'User' } & Pick<
    User,
    | 'id'
    | 'email'
    | 'firstName'
    | 'lastName'
    | 'confirmed'
    | 'preferredLanguage'
    | 'createdAt'
    | 'updatedAt'
  >;
};
