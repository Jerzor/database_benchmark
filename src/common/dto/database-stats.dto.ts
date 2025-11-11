import { ApiProperty } from '@nestjs/swagger';

export class DatabaseStatsDto {
  @ApiProperty({
    example: 10000,
    description: 'Number of records in the database',
  })
  recordCount: number;
}
