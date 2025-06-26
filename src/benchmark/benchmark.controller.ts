import { Controller, Get, Post } from '@nestjs/common';
import { BenchmarkService } from './benchmark.service';

@Controller('benchmark')
export class BenchmarkController {
  constructor(private readonly service: BenchmarkService) {}

  // PostgreSQL
  @Post('postgres/write')
  write() {
    return this.service.runBenchmark('postgres');
  }

  @Get('postgres/read')
  read() {
    return this.service.runRead('postgres');
  }

  @Post('postgres/clear')
  clearPostgres() {
    return this.service.clear('postgres');
  }

  // MySQL
  @Post('mysql/write')
  writeMysql() {
    return this.service.runBenchmark('mysql');
  }

  @Get('mysql/read')
  readMysql() {
    return this.service.runRead('mysql');
  }

  @Post('mysql/clear')
  clearMysql() {
    return this.service.clear('mysql');
  }

  // MongoDB
  @Post('mongodb/write')
  writeMongo() {
    return this.service.runBenchmark('mongodb');
  }

  @Get('mongodb/read')
  readMongo() {
    return this.service.runRead('mongodb');
  }

  @Post('mongodb/clear')
  clearMongo() {
    return this.service.clear('mongodb');
  }

  // Redis
  @Post('redis/write')
  writeRedis() {
    return this.service.runBenchmark('redis');
  }

  @Get('redis/read')
  readRedis() {
    return this.service.runRead('redis');
  }

  @Post('redis/clear')
  clearRedis() {
    return this.service.clear('redis');
  }
}
