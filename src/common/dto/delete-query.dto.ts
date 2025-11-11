import { ApiProperty } from '@nestjs/swagger';
import { Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class DeleteQueryDto {
  @ApiProperty({
    example: 100,
    minimum: 1,
    maximum: 10000,
    description: 'Records to delete',
  })
  @Type(() => Number)
  @Min(1)
  @Max(10000)
  count: number;
}
