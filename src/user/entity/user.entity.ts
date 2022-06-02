
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Post } from 'src/post/entity/post.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
  OneToMany
} from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Index()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @Index()
  @Column()
  @Exclude()
  password: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[]

}


