import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Index,
  OneToMany
} from 'typeorm';
import { User } from './user.entity';
@Entity()
export class Role {

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  system_name: string

  @ApiProperty()
  @OneToMany(() => User, (user) => user.role)
  users: Role[]

}


