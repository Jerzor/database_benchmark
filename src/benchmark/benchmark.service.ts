import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../common/dto/create-user.dto';
import { faker } from '@faker-js/faker';
import { DBStrategy } from '../common/interfaces/db-strategy.interface';
import { PostgresStrategy } from './strategies/postgres.strategy';
import { MysqlStrategy } from './strategies/mysql.strategy';
import { MongoDBStrategy } from './strategies/mongodb.strategy';
import { RedisStrategy } from './strategies/redis.strategy';

@Injectable()
export class BenchmarkService {
  private strategies: Record<string, DBStrategy>;

  constructor(
    private postgres: PostgresStrategy,
    private mysql: MysqlStrategy,
    private mongodb: MongoDBStrategy,
    private redis: RedisStrategy,
  ) {
    this.strategies = {
      postgres: this.postgres,
      mysql: this.mysql,
      mongodb: this.mongodb,
      redis: this.redis,
    };
  }

  generateFakeData(count = 1000): CreateUserDto[] {
    return Array.from({ length: count }, () => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 18, max: 90 }),
    }));
  }

  async runBenchmark(db: string) {
    const data = this.generateFakeData();
    return this.strategies[db].write(data);
  }

  async runRead(db: string) {
    return this.strategies[db].read();
  }
}
