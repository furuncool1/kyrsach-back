import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query, Request, Res, SetMetadata, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { AuthGuard } from "@nestjs/passport";
import { CreatePostDto } from "./dto/create.post.dto";
import { PostService } from "./service/post.service";
import { User } from "src/user/entity/user.entity";
import { Post as entityPost } from './entity/post.entity';
import { RolesGuard } from "src/user/midleware/role.midleware";
import { ApiHeader, ApiProperty, ApiResponse } from "@nestjs/swagger";


@Controller()
export class PostController {
  constructor(
    private readonly postService: PostService
  ) { }

  @ApiResponse({ type: [entityPost] })
  @Get('/post')
  index(@Request() req) {

    return this.postService.paginate()
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token'
  })
  @SetMetadata('roles', ['admin', 'author'])
  @ApiResponse({ type: entityPost })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('/post')
  async create(@Body() dto: CreatePostDto, @Request() req) {
    return await this.postService.createPost(dto, req.user.id);
  }


  @SetMetadata('roles', ['admin', 'author'])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiResponse({ type: entityPost })
  @Get("/post/:id")
  async getPost(@Param('id') id: number) {
    return await this.postService.getPost(id);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer'
  })
  @SetMetadata('roles', ['admin', 'author'])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post("/post/:id")
  async updatePost(
    @Res() resp: Response,
    @Param('id')
    id: number,
    @Body()
    dto: CreatePostDto,
    @Request() req) {
    try {
      await this.postService.updatePost(dto, id);
      return resp.status(HttpStatus.OK).json({ text: 'ok' });
    } catch (e) {
      console.log(e);
      return resp.status(HttpStatus.NOT_FOUND).json({ text: "Not Found" });
    }
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token'
  })
  @SetMetadata('roles', ['admin', 'author'])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete('/post/:id')
  async delete(@Res() resp: Response, @Param('id') id: number) {
    await this.postService.deletePost(id);
    return resp.status(HttpStatus.OK).json({ text: 'ok' });
  }


}