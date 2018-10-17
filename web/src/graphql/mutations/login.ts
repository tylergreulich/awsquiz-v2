import { gql } from 'apollo-boost';

export const loginMutation = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
    }
  }
`;
