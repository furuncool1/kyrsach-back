import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "../entity/post.entity";
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { CreatePostDto } from "../dto/create.post.dto";
import { Inject } from "@nestjs/common";
import { UserService } from "src/user/service/user.service";

export class PostService {

  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @Inject(UserService)
    private userService: UserService
  ) { }

  paginate() {
    return this.postRepository.find({
      relations: ['author'],
      order: {
        created_at: "DESC"
      }
    });

  }

  async getPost(id: number) {
    return await this.postRepository.findOne({ id: id });
  }

  async createPost(dto: CreatePostDto, authorId: number) {
    const post = this.postRepository.create(dto);
    post.author = await this.userService.getUserById(authorId);
    return await this.postRepository.save(post);
  }

  async updatePost(dto: CreatePostDto, id: number) {
    const post = await this.postRepository.findOneOrFail({ id: id });
    post.title = dto.title;
    post.content = dto.content;

    this.postRepository.save(post)
  }

  async deletePost(id: number) {
    const post = await this.postRepository.findOneOrFail({ id: id });
    await this.postRepository.remove(post);
  }
}