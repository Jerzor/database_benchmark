import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { DBStrategy } from '../../common/interfaces/db-strategy.interface';
import { User } from '../entities/user.entity';

@Injectable()
export class MongoDBStrategy implements DBStrategy {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async write(data: User[]): Promise<{ inserted: number }> {
    await this.userModel.insertMany(data);
    return { inserted: data.length };
  }

  async read(): Promise<HydratedDocument<User>[]> {
    return this.userModel.find().exec();
  }
}
