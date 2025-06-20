import { User } from '../../benchmark/entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

export interface DBStrategy {
  write(data: CreateUserDto[]): Promise<{ inserted: number }>;
  read(): Promise<User[]>;
}
