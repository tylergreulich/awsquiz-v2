interface RegisterInputFields {
  username: string;
  password: string;
}

interface RegisterInputErrors {
  errors?: {
    [key: string]: RegisterInputFields;
  };
}

export type RegisterState = RegisterInputFields & RegisterInputErrors;
