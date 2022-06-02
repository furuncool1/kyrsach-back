import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Post {

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Column()
  title: String

  @ApiProperty()
  @Column()
  content: String

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date


  @ManyToOne(() => User, (user) => user.posts)
  @ApiProperty({ type: () => User })
  author: User

}


