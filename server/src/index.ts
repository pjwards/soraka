import {ServerApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {ServerApplication};

export async function main(options?: ApplicationConfig) {
  const app = new ServerApplication(options);
  await app.boot();
  await app.start();
  return app;
}
