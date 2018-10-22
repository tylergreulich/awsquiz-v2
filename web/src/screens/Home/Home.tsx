import * as React from 'react';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login';
import axios from 'axios';

import { HomeState } from './home.interface';

export class Home extends React.Component<{}, HomeState> {
  state: HomeState = { isAuthenticated: false };

  onFailureHandler = (err: Error) => {
    console.log('[ERR]', err);
  };

  onGoogleResponse = (response: GoogleLoginResponse) => {
    console.log('[GOOGLE RESPONSE]', response);
    this.onLoginHandler();
  };

  onLoginHandler = async () => {
    const response = await axios.post(process.env.GOOGLE_API_URL!);
    console.log('[LOGIN RESPONSE]', response);
  };

  render() {
    return (
      <>
        <GoogleLogin
          clientId={process.env.GOOGLE_CLIENT_ID!}
          buttonText="Login with Google"
          onSuccess={this.onGoogleResponse}
          onFailure={this.onFailureHandler}
        />
      </>
    );
  }
}
