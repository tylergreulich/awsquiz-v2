import * as React from 'react';
import { Mutation } from 'react-apollo';
import { loginMutation } from '../../../graphql/mutations/login';
import { LoginState } from './login.interface';

export class Login extends React.Component<{}, LoginState> {
  state = {
    username: '',
    password: '',
    errors: {}
  };

  render() {
    const { username, password } = this.state;

    return (
      <>
        <Mutation mutation={loginMutation} variables={{ username, password }}>
          {({ data, error, loading }: any) => {
            if (loading || !data) {
              return null;
            }

            if (error) {
              return error;
            }

            return (
              <>
                <div>Login Component</div>
              </>
            );
          }}
        </Mutation>
      </>
    );
  }
}
