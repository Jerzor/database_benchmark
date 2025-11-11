import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEnum, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { DataComplexity } from '../enums/data-complexity.enum';

export class WriteQueryDto {
  @ApiProperty({
    example: 1000,
    minimum: 1,
    maximum: 10000,
    description: 'Number of objects to save',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @Max(10000)
  count?: number = 1000;

  @ApiProperty({
    example: 'simple',
    enum: DataComplexity,
    description: 'Structure data type',
    required: false,
  })
  @IsOptional()
  @IsEnum(DataComplexity)
  complexity?: DataComplexity = DataComplexity.Simple;
}
