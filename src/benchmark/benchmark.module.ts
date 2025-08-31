import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { BenchmarkService } from './benchmark.service';
import { PostgresStrategy } from './strategies/postgres.strategy';
import { MysqlStrategy } from './strategies/mysql.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { MongoDBStrategy } from './strategies/mongodb.strategy';
import { RedisStrategy } from './strategies/redis.strategy';
import {
  MongoBenchmarkController,
  MysqlBenchmarkController,
  PostgresBenchmarkController,
  RedisBenchmarkController,
} from './benchmark.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // PostgreSQL as default
    TypeOrmModule.forFeature([User], 'mysql'), // MySQL
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), // MongoDB
  ],
  controllers: [
    PostgresBenchmarkController,
    MysqlBenchmarkController,
    MongoBenchmarkController,
    RedisBenchmarkController,
  ],
  providers: [
    BenchmarkService,
    PostgresStrategy,
    MysqlStrategy,
    MongoDBStrategy,
    RedisStrategy,
  ],
})
export class BenchmarkModule {}
