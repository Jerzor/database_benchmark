import { Controller, Get, Post } from '@nestjs/common';
import { BenchmarkService } from './benchmark.service';

@Controller('benchmark')
export class BenchmarkController {
  constructor(private readonly service: BenchmarkService) {}

  @Post('postgres/write')
  write() {
    return this.service.runBenchmark('postgres');
  }

  @Get('postgres/read')
  read() {
    return this.service.runRead('postgres');
  }

  @Post('mysql/write')
  writeMysql() {
    return this.service.runBenchmark('mysql');
  }

  @Get('mysql/read')
  readMysql() {
    return this.service.runRead('mysql');
  }

  @Post('mongodb/write')
  writeMongo() {
    return this.service.runBenchmark('mongodb');
  }

  @Get('mongodb/read')
  readMongo() {
    return this.service.runRead('mongodb');
  }
}
