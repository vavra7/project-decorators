import Redis from 'ioredis';
import { Service } from 'typedi';

@Service()
export class RedisStoreService {
  private readonly client: Redis.Redis;
  private readonly banTokens = 'tokens';

  constructor() {
    this.client = new Redis({
      host: '127.0.0.1',
      port: 6379
    });
  }

  public async addToBanTokens(token: string): Promise<true> {
    await this.client.sadd(this.banTokens, token);
    return true;
  }

  public async isTokenBanned(token: string): Promise<boolean> {
    return !!(await this.client.sismember(this.banTokens, token));
  }
}
