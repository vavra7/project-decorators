import { Service } from 'typedi';
import { v4 } from 'uuid';
import { redis } from '../utils';

@Service()
export class ConfirmEmailRepository {
  private readonly prefix = 'ce:';
  private readonly expire = 60 * 60 * 24 * 2;
  private readonly client = redis;

  public async create(userId: string): Promise<string> {
    const key = this.prefix + v4();
    await this.client.set(key, userId, 'EX', this.expire);
    return key;
  }
}
