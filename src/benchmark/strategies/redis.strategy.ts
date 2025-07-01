import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { DBStrategy } from '../../common/interfaces/db-strategy.interface';
import { User } from '../entities/user.entity';

@Injectable()
export class RedisStrategy implements DBStrategy, OnModuleInit {
  private client: Redis;

  onModuleInit() {
    this.client = new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    });
  }

  async write(data: User[]): Promise<{ inserted: number }> {
    const pipeline = this.client.pipeline();

    for (const item of data) {
      const id = await this.client.incr('user:id');
      pipeline.set(`user:${id}`, JSON.stringify(item));
    }

    await pipeline.exec();
    return { inserted: data.length };
  }

  async read(): Promise<User[]> {
    const keys = await this.client.keys('user:*');

    if (!keys.length) return [];

    const values = await this.client.mget(...keys);
    return values
      .filter((v): v is string => v !== null)
      .map((v) => JSON.parse(v) as User);
  }

  async clear(): Promise<void> {
    await this.client.flushdb();
  }
}
