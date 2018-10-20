interface LoginInputFields {
  username: string;
  password: string;
}

interface LoginInputErrors {
  errors?: {
    [key: string]: LoginInputFields;
  };
}

export type LoginState = LoginInputFields & LoginInputErrors;
