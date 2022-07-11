import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  emailAddress: string;
  @Column()
  @Column()
  hashUserId: string;
  passwordHash: string;
  @Column('text', { array: true })
  projects: string[];
  @Column()
  apiKey: string;
  @Column()
  timeZone: string;
  @Column('bool', { default: true })
  notificationTurnedOn: boolean;
}
