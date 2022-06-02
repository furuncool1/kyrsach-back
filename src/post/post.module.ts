import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "src/user/user.module";
import { Post } from "./entity/post.entity";
import { PostController } from "./post.controller";
import { PostService } from "./service/post.service";

@Module({
  imports: [TypeOrmModule.forFeature([Post]), UserModule],
  controllers: [PostController],
  providers: [
    PostService,
  ],
})
export class PostModule { }