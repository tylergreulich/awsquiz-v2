import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne
} from 'typeorm';
import { User } from './User';

@Entity('google_auth')
export class GoogleAuth extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  google_id: string;

  @Column('text')
  display_name: string;

  @Column('text')
  user_id: string;

  @OneToOne(() => User)
  user: User;
}
