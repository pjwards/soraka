import fetch from 'node-fetch';
import { UserResponse } from './facebook.interfaces';

const base: string = 'https://graph.facebook.com';

export async function me(accessToken: string, fields: string = 'id,name,email'): Promise<UserResponse> {
  return api(accessToken, `me${fields ? `?fields=${fields}` : ''}`) as Promise<UserResponse>;
}

export async function api(accessToken: string, method: string): Promise<object> {
  let url: string = base + `/${method}`;
  url += (url.indexOf('?') === -1 ? '?' : '&') + `access_token=${accessToken}&method=get&pretty=0&sdk=joey&suppress_http_code=1`;
  return fetch(url)
    .then(response => response.json())
    .then(response => {
      if(response.error) {
        throw new Error(response.error.message);
      }
      return response;
    });
}