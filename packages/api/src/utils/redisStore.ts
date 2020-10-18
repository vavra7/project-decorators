import Redis from 'ioredis';

class RedisStore {
  private _client?: Redis.Redis;

  get client(): Redis.Redis {
    if (this._client) {
      return this._client;
    } else {
      return (this._client = this.createConnection());
    }
  }

  private createConnection(): Redis.Redis {
    return new Redis({
      host: '127.0.0.1',
      port: 6379
    });
  }
}

export const redis = new RedisStore().client;
