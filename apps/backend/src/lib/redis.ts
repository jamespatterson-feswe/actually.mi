import { env } from './env';
import Redis from 'ioredis';

const createRedisClient = () => {
  if (env.nodeEnv === 'production') return new Redis(env.redisUrl);

  // Return a no-op client for dev/test
  return {
    get: async () => null,
    set: async () => 'OK',
    del: async () => 1,
  } as unknown as Redis;
};

export const redis = createRedisClient();
