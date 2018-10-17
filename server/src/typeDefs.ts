import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  ## import {  Leaderboards } from './entity/Leaderboard.ts'

  type User {
    id: ID!
    username: String!
  }

  type Leaderboard {
    id: ID!
    username: String!
    score: Int!
  }

  type Query {
    me: User
    leaderboardResults: [Leaderboard!]
  }

  type Mutation {
    register(username: String!, password: String!): Boolean!
    login(username: String!, password: String!): User
    logout: Boolean!
    addScore(username: String!, score: Int!): Leaderboard
  }
`;
