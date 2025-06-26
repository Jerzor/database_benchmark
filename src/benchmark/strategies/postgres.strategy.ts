import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { DBStrategy } from '../../common/interfaces/db-strategy.interface';

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
}
