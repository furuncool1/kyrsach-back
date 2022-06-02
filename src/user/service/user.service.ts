import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Role } from '../entity/role.entity';
import { User } from '..//entity/user.entity';
import { RegisterDto } from 'src/auth/dto/registerDto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) { }

  async getUserByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({
      relations: ['role'],
      where: {
        email: email,
      },
    });
  }

  async getUserById(id: number) {
    return await this.usersRepository.findOne({ id: id });
  }

  async createUser(registerDto: RegisterDto): Promise<User> {

    const user = this.usersRepository.create(registerDto);
    user.password = await bcrypt.hash(user.password, 10);
    user.role = await this.roleRepository.findOne({ id: 2 });
    return await this.usersRepository.save(user);
  }



}
