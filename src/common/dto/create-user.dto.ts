import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddressDto {
  @ApiProperty()
  street: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  zipCode: string;
}

export class EducationDto {
  @ApiProperty()
  institution: string;

  @ApiProperty()
  degree: string;

  @ApiProperty()
  graduationYear: number;

  @ApiPropertyOptional()
  gpa?: number;
}

export class WorkExperienceDto {
  @ApiProperty()
  company: string;

  @ApiProperty()
  position: string;

  @ApiProperty()
  startDate: Date;

  @ApiPropertyOptional()
  endDate?: Date;

  @ApiProperty({ type: [String] })
  skills: string[];
}

export class ProfileDto {
  @ApiProperty()
  bio: string;

  @ApiProperty({ type: [String] })
  interests: string[];

  @ApiProperty({ type: [EducationDto] })
  education: EducationDto[];

  @ApiProperty({ type: [WorkExperienceDto] })
  workExperience: WorkExperienceDto[];

  @ApiProperty()
  socialMedia: SocialMediaDto;
}

export class SocialMediaDto {
  @ApiPropertyOptional()
  linkedin?: string;

  @ApiPropertyOptional()
  github?: string;

  @ApiPropertyOptional()
  twitter?: string;
}

export class SettingsDto {
  @ApiProperty()
  language: string;

  @ApiProperty()
  timezone: string;

  @ApiProperty()
  notifications: { email: boolean; push: boolean; sms: boolean };
}

export class CreateUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  age: number;

  @ApiPropertyOptional()
  address?: AddressDto;

  @ApiPropertyOptional()
  phone?: string;

  @ApiPropertyOptional()
  birthDate?: Date;

  @ApiPropertyOptional()
  profile?: ProfileDto;

  @ApiPropertyOptional()
  settings?: SettingsDto;
}
