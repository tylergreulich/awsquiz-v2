import { gql } from 'apollo-boost';

export const registerMutation = gql`
  mutation RegisterMutation($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      id
      username
    }
  }
`;
