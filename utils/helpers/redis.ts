import Redis from 'ioredis';
export const KEY_BAN_IP = 'banned-ip';
export const redisClient = new Redis(6379);
