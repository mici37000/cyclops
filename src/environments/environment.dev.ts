import { environment as base } from './environment.base';

export const environment = {
  ...base,
  production: false,
  baseClientURI: 'http://localhost:4200/'
};
