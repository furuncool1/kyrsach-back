import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { profile } from 'console';
import { Repository } from 'typeorm';
import { Role } from './user/entity/role.entity';
import { User } from './user/entity/user.entity';

@Injectable()
export class AppService { }
