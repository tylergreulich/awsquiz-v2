import * as React from 'react';
import { Mutation } from 'react-apollo';
import { registerMutation } from '../../../graphql/mutations/register';
import { RegisterState } from './register.interface';

export class Register extends React.Component<{}, RegisterState> {
  state = {
    username: '',
    password: '',
    errors: {}
  };

  render() {
    const { username, password } = this.state;

    return (
      <>
        <Mutation
          mutation={registerMutation}
          variables={{ username, password }}
        >
          {({ data, error, loading }: any) => {
            if (loading || !data) {
              return null;
            }

            if (error) {
              return error;
            }

            return (
              <>
                <div>Register Component</div>
              </>
            );
          }}
        </Mutation>
      </>
    );
  }
}
