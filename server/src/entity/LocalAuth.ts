import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { User } from './User';

@Entity('local_auth')
export class LocalAuth extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  email: string;

  @Column('text')
  password: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
