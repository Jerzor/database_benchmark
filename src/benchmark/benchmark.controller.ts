import { Controller, Get, Post } from '@nestjs/common';
import { BenchmarkService } from './benchmark.service';
import { DatabaseType } from '../common/enums/database.enum';

@Controller('benchmark')
export class BenchmarkController {
  constructor(private readonly service: BenchmarkService) {}

  // PostgreSQL
  @Post('postgres/write')
  write() {
    return this.service.runBenchmark(DatabaseType.Postgres);
  }

  @Get('postgres/read')
  read() {
    return this.service.runRead(DatabaseType.Postgres);
  }

  @Post('postgres/clear')
  clearPostgres() {
    return this.service.clear(DatabaseType.Postgres);
  }

  // MySQL
  @Post('mysql/write')
  writeMysql() {
    return this.service.runBenchmark(DatabaseType.MySQL);
  }

  @Get('mysql/read')
  readMysql() {
    return this.service.runRead(DatabaseType.MySQL);
  }

  @Post('mysql/clear')
  clearMysql() {
    return this.service.clear(DatabaseType.MySQL);
  }

  // MongoDB
  @Post('mongodb/write')
  writeMongo() {
    return this.service.runBenchmark(DatabaseType.MongoDB);
  }

  @Get('mongodb/read')
  readMongo() {
    return this.service.runRead(DatabaseType.MongoDB);
  }

  @Post('mongodb/clear')
  clearMongo() {
    return this.service.clear(DatabaseType.MongoDB);
  }

  // Redis
  @Post('redis/write')
  writeRedis() {
    return this.service.runBenchmark(DatabaseType.Redis);
  }

  @Get('redis/read')
  readRedis() {
    return this.service.runRead(DatabaseType.Redis);
  }

  @Post('redis/clear')
  clearRedis() {
    return this.service.clear(DatabaseType.Redis);
  }
}
