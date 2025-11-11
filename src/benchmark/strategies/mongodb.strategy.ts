import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { DBStrategy } from '../../common/interfaces/db-strategy.interface';
import { User } from '../entities/user.entity';
import { DatabaseStatsDto } from '../../common/dto/database-stats.dto';

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

  async clear(): Promise<void> {
    await this.userModel.deleteMany({});
  }

  async stats(): Promise<DatabaseStatsDto> {
    const count = await this.userModel.countDocuments();
    return { recordCount: count };
  }

  async deleteRecords(count: number): Promise<{ deleted: number }> {
    const records = await this.userModel
      .find({}, { _id: 1 })
      .limit(count)
      .exec();

    if (!records.length) {
      return { deleted: 0 };
    }

    const ids = records.map((r) => r._id);
    const result = await this.userModel.deleteMany({ _id: { $in: ids } });

    return { deleted: result.deletedCount ?? 0 };
  }
}
