import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../common/dto/create-user.dto';
import { faker } from '@faker-js/faker';
import { DBStrategy } from '../common/interfaces/db-strategy.interface';
import { PostgresStrategy } from './strategies/postgres.strategy';
import { MysqlStrategy } from './strategies/mysql.strategy';
import { MongoDBStrategy } from './strategies/mongodb.strategy';
import { RedisStrategy } from './strategies/redis.strategy';
import { DataComplexity } from '../common/enums/data-complexity.enum';

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

  private buildSimple(): Partial<CreateUserDto> {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 18, max: 90 }),
    };
  }

  private buildComplex(): Partial<CreateUserDto> {
    return {
      ...this.buildSimple(),
      address: {
        street: faker.location.street(),
        city: faker.location.city(),
        country: faker.location.country(),
        zipCode: faker.location.zipCode(),
      },
      phone: faker.phone.number(),
      birthDate: faker.date.birthdate(),
    };
  }

  private buildNested(): Partial<CreateUserDto> {
    return {
      ...this.buildComplex(),
      profile: {
        bio: faker.lorem.paragraph(),
        interests: faker.helpers.arrayElements([
          'music',
          'sports',
          'movies',
          'technology',
          'reading',
        ]),
        education: [
          {
            institution: faker.company.name(),
            degree: 'Bachelor',
            graduationYear: faker.date.past({ years: 10 }).getFullYear(),
            gpa: faker.number.float({ min: 2.0, max: 4.0 }),
          },
        ],
        workExperience: [
          {
            company: faker.company.name(),
            position: faker.person.jobTitle(),
            startDate: faker.date.past({ years: 5 }),
            endDate: faker.date.recent(),
            skills: ['JavaScript', 'Node.js'],
          },
        ],
        socialMedia: {
          linkedin: faker.internet.url(),
          github: faker.internet.url(),
        },
      },
      settings: {
        language: 'en',
        timezone: 'UTC',
        notifications: {
          email: true,
          push: false,
          sms: false,
        },
      },
    };
  }

  generateFakeData(count: number, complexity: DataComplexity): CreateUserDto[] {
    const builderMap = {
      [DataComplexity.Simple]: () => this.buildSimple(),
      [DataComplexity.Complex]: () => this.buildComplex(),
      [DataComplexity.Nested]: () => this.buildNested(),
    };

    return Array.from({ length: count }, () =>
      builderMap[complexity](),
    ) as CreateUserDto[];
  }

  async runBenchmark(
    db: string,
    count: number = 1000,
    complexity: DataComplexity = DataComplexity.Simple,
  ) {
    const data = this.generateFakeData(count, complexity);
    return this.strategies[db].write(data);
  }

  async runRead(db: string) {
    return this.strategies[db].read();
  }

  async clear(db: string) {
    return this.strategies[db].clear();
  }

  async getDatabaseStats(db: string) {
    return this.strategies[db].stats();
  }

  async deleteRecords(db: string, count: number) {
    return this.strategies[db].deleteRecords(count);
  }
}
