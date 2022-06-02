import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { Role } from './user/entity/role.entity';
import { User } from './user/entity/user.entity';
import { UserModule } from './user/user.module';


@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
