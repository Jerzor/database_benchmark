import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { DBStrategy } from '../../common/interfaces/db-strategy.interface';
import { DatabaseStatsDto } from '../../common/dto/database-stats.dto';

@Injectable()
export class PostgresStrategy implements DBStrategy {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async write(data: User[]): Promise<{ inserted: number }> {
    const repo = this.dataSource.getRepository(User);
    await repo.save(data);
    return { inserted: data.length };
  }

  async read(): Promise<User[]> {
    const repo = this.dataSource.getRepository(User);
    return await repo.find();
  }

  async clear(): Promise<void> {
    const repo = this.dataSource.getRepository(User);
    await repo.clear();
  }

  async stats(): Promise<DatabaseStatsDto> {
    const repo = this.dataSource.getRepository(User);
    const count = await repo.count();
    return { recordCount: count };
  }

  async deleteRecords(count: number): Promise<{ deleted: number }> {
    const repo = this.dataSource.getRepository(User);

    const records = await repo.find({
      select: ['id'],
      take: count,
    });

    if (records.length === 0) {
      return { deleted: 0 };
    }

    const ids = records.map((r) => r.id);
    const result = await repo.delete(ids);

    return { deleted: result.affected ?? 0 };
  }
}
