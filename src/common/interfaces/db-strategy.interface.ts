import { User } from '../../benchmark/entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { DatabaseStatsDto } from '../dto/database-stats.dto';

export interface DBStrategy {
  write(data: CreateUserDto[]): Promise<{ inserted: number }>;
  read(): Promise<User[]>;
  clear(): Promise<void>;
  stats(): Promise<DatabaseStatsDto>;
  deleteRecords(count: number): Promise<{ deleted: number }>;
}
