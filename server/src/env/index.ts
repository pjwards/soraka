import { ENVIRONMENT } from '../const';
import real from './real';
import dev from './dev';

let env = {
  CLIENT: '',
};

if (ENVIRONMENT === 'production') {
  env = {
    ...env,
    ...real,
  };
} else {
  env = {
    ...env,
    ...dev,
  };
}

export default env;
