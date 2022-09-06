export interface ICookie {
  name: string;
  value: string;
  path?: string;
  expires?: string;
  secure: boolean;
}

export interface IAccount {
  _id: string;
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
  _id?: string;
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

export const accounts: IAccount[] = [
  {
    _id: '624362cbbd934cd5237e2b93',
    disabled: true,
    password: 'Ma$m3L4D_1990',
    proxies: [
      'PROXY211',
      'PROXY232',
    ],
    cookies: {
      'domain.com': [
        {
          name: 'cookie1',
          value: 'myvalue',
          secure: true,
        },
        {
          name: 'cookie2',
          value: 'onemorevalue',
          secure: true,
          path: '/login',
        },
      ],
      'domain.net': [
        {
          name: 'cookie',
          value: 'value',
          secure: false,
          path: '/',
        },
      ],
    },
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36',
    username: 'teelka',
  },
  {
    _id: '589635cbbd934cd5237e2b93',
    disabled: false,
    password: 'Wr39mabqtQpgTv9',
    proxies: [
      'PROXY211',
      'PROXY232',
    ],
    cookies: {
      'domain.com': [
        {
          name: 'cookie1',
          value: 'myvalue',
          secure: true,
        },
        {
          name: 'cookie2',
          value: 'onemorevalue',
          secure: true,
          path: '/login',
        },
      ],
      'domain.net': [
        {
          name: 'cookie',
          value: 'value',
          secure: false,
          path: '/',
        },
      ],
    },
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36',
    username: 'asdfb',
  },
];

export const proxies: IProxy[] = [
  {
    label: 'PROXY211',
  },
  {
    label: 'PROXY232',
  },
];
