export interface ICookie {
  name: string;
  value: string;
  path?: string;
  expires?: string;
  secure: boolean;
}

export interface IAccount {
  id: string;
  disabled: boolean;
  password: string;
  proxies: string[];
  cookies: {
    [key: string]: ICookie[]
  };
  userAgent: string;
  username: string;
}

export interface IAccountRequest {
  id?: string;
  disabled: boolean;
  password: string;
  proxies?: string[];
  cookies?: {
    [key: string]: ICookie[]
  };
  userAgent?: string;
  username: string;
}

export interface IProxy {
  label: string;
}
