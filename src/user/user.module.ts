import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Role } from './entity/role.entity';
import { UserService } from './service/user.service';
@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {


}
