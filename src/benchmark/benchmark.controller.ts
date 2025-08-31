import { Controller, Get, Post } from '@nestjs/common';
import { BenchmarkService } from './benchmark.service';
import { DatabaseType } from '../common/enums/database.enum';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('PostgreSQL')
@Controller('benchmark/postgres')
export class PostgresBenchmarkController {
  constructor(private readonly service: BenchmarkService) {}

  @Post('write')
  write() {
    return this.service.runBenchmark(DatabaseType.Postgres);
  }

  @Get('read')
  read() {
    return this.service.runRead(DatabaseType.Postgres);
  }

  @Post('clear')
  clear() {
    return this.service.clear(DatabaseType.Postgres);
  }
}

@ApiTags('MySQL')
@Controller('benchmark/mysql')
export class MysqlBenchmarkController {
  constructor(private readonly service: BenchmarkService) {}

  @Post('write')
  write() {
    return this.service.runBenchmark(DatabaseType.MySQL);
  }

  @Get('read')
  read() {
    return this.service.runRead(DatabaseType.MySQL);
  }

  @Post('clear')
  clear() {
    return this.service.clear(DatabaseType.MySQL);
  }
}

@ApiTags('MongoDB')
@Controller('benchmark/mongodb')
export class MongoBenchmarkController {
  constructor(private readonly service: BenchmarkService) {}

  @Post('write')
  write() {
    return this.service.runBenchmark(DatabaseType.MongoDB);
  }

  @Get('read')
  read() {
    return this.service.runRead(DatabaseType.MongoDB);
  }

  @Post('clear')
  clear() {
    return this.service.clear(DatabaseType.MongoDB);
  }
}

@ApiTags('Redis')
@Controller('benchmark/redis')
export class RedisBenchmarkController {
  constructor(private readonly service: BenchmarkService) {}

  @Post('write')
  write() {
    return this.service.runBenchmark(DatabaseType.Redis);
  }

  @Get('read')
  read() {
    return this.service.runRead(DatabaseType.Redis);
  }

  @Post('clear')
  clear() {
    return this.service.clear(DatabaseType.Redis);
  }
}
