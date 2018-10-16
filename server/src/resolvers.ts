import { IResolvers } from 'graphql-tools';

export const resolvers: IResolvers = {
  Query: {
    hello: () => 'World'
  }
};
