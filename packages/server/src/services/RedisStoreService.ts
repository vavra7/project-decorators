import Redis from 'ioredis';
import { Service } from 'typedi';

@Service()
export class RedisStoreService {
  private client: Redis.Redis;

  constructor() {
    this.client = new Redis({
      host: 'localhost',
      port: 6379
    });
  }
}
