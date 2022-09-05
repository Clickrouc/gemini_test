export interface ICookie {
  name: string;
  value: string;
  path?: string;
  expires?: string;
  secure: boolean;
  type?: boolean;
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

export default [
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
];
