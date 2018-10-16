import * as React from 'react';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login';
import axios from 'axios';

interface State {
  isAuthenticated: boolean;
}

export class Home extends React.Component<{}, State> {
  state: State = { isAuthenticated: false };

  onFailureHandler = (err: any) => {
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
