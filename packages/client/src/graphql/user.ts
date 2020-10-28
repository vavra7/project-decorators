import { gql } from '@apollo/client';

export const registerUserMutation = gql`
  mutation RegisterUser($data: RegisterUserInput!) {
    registerUser(data: $data) {
      id
      email
      firstName
      lastName
      confirmed
      preferredLanguage
      createdAt
      updatedAt
    }
  }
`;
