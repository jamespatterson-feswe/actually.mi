import dotenv from 'dotenv';

dotenv.config();

const _env = process.env;

const missing: string[] = [];
const requiredEnvVariables = ['DATABASE_URL', 'JWT_SECRET', 'REDIS_URL'];
const replacement = '$variables$';

requiredEnvVariables.forEach((variable) => {
  if (!_env[variable]) missing.push(variable);

  if (missing.length)
    throw new Error(
      `Error: Missing environment variable${missing.length > 1 ? 's' : ''}: ${replacement}`.replace(
        replacement,
        missing.join(', ')
      )
    );
});

export const env: Record<string, string> = {
  databaseUrl: _env[requiredEnvVariables[0]] as string,
  jwtSecret: _env[requiredEnvVariables[1]] as string,
  port: _env.PORT || '8080',
  nodeEnv: _env.NODE_ENV || 'development',
  redisUrl: _env.REDIS_URL || '',
};
