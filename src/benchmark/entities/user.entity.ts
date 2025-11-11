import { Entity, PrimaryGeneratedColumn, Column, VersionColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  age: number;

  @Column({ type: 'json', nullable: true })
  address?: {
    street: string;
    city: string;
    country: string;
    zipCode: string;
  };

  @Column({ nullable: true })
  phone?: string;

  @Column({ type: 'timestamp', nullable: true })
  birthDate?: Date;

  @Column({ type: 'json', nullable: true })
  profile?: {
    bio: string;
    interests: string[];
    education: Array<{
      institution: string;
      degree: string;
      graduationYear: number;
      gpa?: number;
    }>;
    workExperience: Array<{
      company: string;
      position: string;
      startDate: Date;
      endDate?: Date;
      skills: string[];
    }>;
    socialMedia: {
      linkedin?: string;
      github?: string;
      twitter?: string;
    };
  };

  @Column({ type: 'json', nullable: true })
  settings?: {
    language: string;
    timezone: string;
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
  };

  @VersionColumn()
  version: number;
}
