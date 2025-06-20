import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './benchmark/entities/user.entity';
import databaseConfig from './config/database.config';
import { BenchmarkModule } from './benchmark/benchmark.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [databaseConfig] }),

    /** postgres */
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ...config.get('postgres'),
        entities: [User],
        synchronize: true,
      }),
    }),

    /** mysql */
    TypeOrmModule.forRootAsync({
      name: 'mysql',
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ...config.get('mysql'),
        entities: [User],
        synchronize: true,
      }),
    }),

    /** mongodb */
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get('mongodb.uri'),
      }),
    }),
    BenchmarkModule,
  ],
})
export class AppModule {}
