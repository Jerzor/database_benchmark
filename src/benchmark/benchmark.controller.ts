import { Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { BenchmarkService } from './benchmark.service';
import { DatabaseType } from '../common/enums/database.enum';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { WriteQueryDto } from '../common/dto/write-query.dto';
import { DeleteQueryDto } from '../common/dto/delete-query.dto';

@ApiTags('PostgreSQL')
@Controller('benchmark/postgres')
export class PostgresBenchmarkController {
  constructor(private readonly service: BenchmarkService) {}

  @Post()
  @ApiOperation({ summary: 'Save data' })
  write(@Query() query: WriteQueryDto) {
    const { count, complexity } = query;
    return this.service.runBenchmark(DatabaseType.Postgres, count, complexity);
  }

  @Get()
  @ApiOperation({ summary: 'Read all records' })
  read() {
    return this.service.runRead(DatabaseType.Postgres);
  }

  @Post('clear')
  @ApiOperation({ summary: 'Clear database' })
  clear() {
    return this.service.clear(DatabaseType.Postgres);
  }

  @Delete()
  @ApiOperation({ summary: 'Remove last n records' })
  deleteRecords(@Query() query: DeleteQueryDto) {
    const { count } = query;
    return this.service.deleteRecords(DatabaseType.Postgres, count);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get all records count' })
  stats() {
    return this.service.getDatabaseStats(DatabaseType.Postgres);
  }
}

@ApiTags('MySQL')
@Controller('benchmark/mysql')
export class MysqlBenchmarkController {
  constructor(private readonly service: BenchmarkService) {}

  @Post()
  @ApiOperation({ summary: 'Save data' })
  write(@Query() query: WriteQueryDto) {
    const { count, complexity } = query;
    return this.service.runBenchmark(DatabaseType.MySQL, count, complexity);
  }

  @Get()
  @ApiOperation({ summary: 'Read all records' })
  read() {
    return this.service.runRead(DatabaseType.MySQL);
  }

  @Post('clear')
  @ApiOperation({ summary: 'Clear database' })
  clear() {
    return this.service.clear(DatabaseType.MySQL);
  }

  @Delete()
  @ApiOperation({ summary: 'Remove last n records' })
  deleteRecords(@Query() query: DeleteQueryDto) {
    const { count } = query;
    return this.service.deleteRecords(DatabaseType.MySQL, count);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get all records count' })
  stats() {
    return this.service.getDatabaseStats(DatabaseType.MySQL);
  }
}

@ApiTags('MongoDB')
@Controller('benchmark/mongodb')
export class MongoBenchmarkController {
  constructor(private readonly service: BenchmarkService) {}

  @Post()
  @ApiOperation({ summary: 'Save data' })
  write(@Query() query: WriteQueryDto) {
    const { count, complexity } = query;
    return this.service.runBenchmark(DatabaseType.MongoDB, count, complexity);
  }

  @Get()
  @ApiOperation({ summary: 'Read all records' })
  read() {
    return this.service.runRead(DatabaseType.MongoDB);
  }

  @Post('clear')
  @ApiOperation({ summary: 'Clear database' })
  clear() {
    return this.service.clear(DatabaseType.MongoDB);
  }

  @Delete()
  @ApiOperation({ summary: 'Remove last n records' })
  deleteRecords(@Query() query: DeleteQueryDto) {
    const { count } = query;
    return this.service.deleteRecords(DatabaseType.MongoDB, count);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get all records count' })
  stats() {
    return this.service.getDatabaseStats(DatabaseType.MongoDB);
  }
}

@ApiTags('Redis')
@Controller('benchmark/redis')
export class RedisBenchmarkController {
  constructor(private readonly service: BenchmarkService) {}

  @Post()
  @ApiOperation({ summary: 'Save data' })
  write(@Query() query: WriteQueryDto) {
    const { count, complexity } = query;
    return this.service.runBenchmark(DatabaseType.Redis, count, complexity);
  }

  @Get()
  @ApiOperation({ summary: 'Read all records' })
  read() {
    return this.service.runRead(DatabaseType.Redis);
  }

  @Post('clear')
  @ApiOperation({ summary: 'Clear database' })
  clear() {
    return this.service.clear(DatabaseType.Redis);
  }

  @Delete()
  @ApiOperation({ summary: 'Remove last n records' })
  deleteRecords(@Query() query: DeleteQueryDto) {
    const { count } = query;
    return this.service.deleteRecords(DatabaseType.Redis, count);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get all records count' })
  stats() {
    return this.service.getDatabaseStats(DatabaseType.Redis);
  }
}
