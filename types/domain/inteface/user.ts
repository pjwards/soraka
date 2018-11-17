export interface UserInterface {
  email: string;
  profile?: UserProfileInterface;
}

export interface UserProfileInterface {
  name: string;
  gender: string;
  location: string;
  website: string;
  picture: string;
}

export interface UserModelInterface {
  email: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpires: Date;

  facebook: string;
  tokens: AuthToken[];

  profile: {
    name: string,
    gender: string,
    location: string,
    website: string,
    picture: string,
  };

  comparePassword: comparePasswordFunction;
  gravatar: gravatarFunction;
}

export interface AuthToken {
  accessToken: string;
  kind: string;
}

export type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;

export type gravatarFunction = (size: number) => string;
