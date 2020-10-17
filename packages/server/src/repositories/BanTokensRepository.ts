import { Service } from 'typedi';
import { redis } from '../utils';

@Service()
export class BanTokensRepository {
  private readonly banTokens = 'banTokens';
  private readonly client = redis;

  public async add(token: string): Promise<boolean> {
    return !!(await this.client.sadd(this.banTokens, token));
  }

  public async isBanned(token: string): Promise<boolean> {
    return !!(await this.client.sismember(this.banTokens, token));
  }
}
