import { Leaderboard } from './entity/Leaderboard';
import * as bcrypt from 'bcryptjs';
import { IResolvers } from 'graphql-tools';
import { User } from './entity/User';

export const resolvers: IResolvers = {
  Query: {
    me: (_, __, { req }) => {
      if (!req.session.userId) {
        return null;
      }

      return User.findOne(req.session.userId);
    },
    leaderboardResults: async (_, __) => {
      const results = await Leaderboard.find({
        order: { score: 'DESC' }
      });

      return results;
    }
  },
  Mutation: {
    logout: async (_, __, { req, res }) => {
      await new Promise(res => req.session.destroy(() => res()));
      res.clearCookie('connect.sid');
      return true;
    },
    register: async (_, { username, password }) => {
      await User.create({
        username,
        password
      }).save();

      return true;
    },
    login: async (_, { username, password }, { req }) => {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return null;
      }

      const valid = await bcrypt.compare(password, user.password as string);
      if (!valid) {
        return null;
      }

      req.session.userId = user.id;

      return user;
    },
    addScore: async (_, { username, score }) => {
      const user = await User.findOne({ where: { username } });

      if (!user) {
        return null;
      }

      const currentUserScore = await Leaderboard.findOne({
        where: { username }
      });

      if (currentUserScore) {
        currentUserScore.score = score;
        currentUserScore.save();
        return currentUserScore;
      }

      const newScore = await Leaderboard.insert({
        id: user.id,
        username: user.username,
        score
      });

      return newScore;
    }
  }
};
