import { env } from './lib/env';
import app from './app';

app
  .listen(env.port, () => {
    console.log(`Server is running on port ${env.port}.`);
  })
  .on('error', (err) => {
    console.error('Server failed to start: ', err);
  });
