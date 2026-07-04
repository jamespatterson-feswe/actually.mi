import { env } from './env';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

import dotenv from 'dotenv';

dotenv.config();

/** allows node processes to exit cleanly when idle, helps restarts and fresh deploys */
const allowExitOnIdle = true;
const connectionString = env.databaseUrl;
/** how long a connection waits before throwing an error when opening up a new connection from the pool */
const connectionTimeoutMillis = 2000;
/** how long each connection goes idle before being closed and removed, freeing up idle connections */
const idleTimeoutMillis = 30000;
/** periodically sends TCP packets to keep idle connections from dropping, defense against aggressive load balancers */
const keepAlive = true;
/** how long before the first TCP packets will be sent to keep idle connections from dropping */
const keepAliveInitialDelayMillis = 10000;
/** max number of connections DB will allow at any given moment */
const max = 20;
/** min number of connections that are kept alive to ensure less latency */
const min = 2;

export const prisma = new PrismaClient({
  adapter: new PrismaPg(
    new Pool({
      allowExitOnIdle,
      connectionString,
      connectionTimeoutMillis,
      idleTimeoutMillis,
      keepAlive,
      keepAliveInitialDelayMillis,
      max,
      min,
    })
  ),
});
