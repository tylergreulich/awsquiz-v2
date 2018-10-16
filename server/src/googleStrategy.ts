import { Profile, Strategy } from 'passport-google-oauth20';

import { GoogleAuth } from './entity/GoogleAuth';
import { User } from './entity/User';

export const GoogleStrategy = new Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: 'https://742aaec3.ngrok.io/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, cb) => {
    await googleAuthLogin(profile);
    cb(null, {});
  }
);

const googleAuthLogin = async (profile: Profile) => {
  const { id, displayName: display_name } = profile;
  const googleUsers = await GoogleAuth.findOne({ where: { google_id: id } });
  if (!googleUsers) {
    const user = await User.create().save();
    await GoogleAuth.create({
      google_id: id.toString(),
      display_name,
      user_id: user.id
    }).save();
    console.log(user);
  }
  console.log(profile);
};
