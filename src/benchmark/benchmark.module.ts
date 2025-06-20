import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { BenchmarkController } from './benchmark.controller';
import { BenchmarkService } from './benchmark.service';
import { PostgresStrategy } from './strategies/postgres.strategy';
import { MysqlStrategy } from './strategies/mysql.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // PostgreSQL as default
    TypeOrmModule.forFeature([User], 'mysql'), // MySQL
  ],
  controllers: [BenchmarkController],
  providers: [BenchmarkService, PostgresStrategy, MysqlStrategy],
})
export class BenchmarkModule {}
