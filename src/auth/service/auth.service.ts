import { BadRequestException, Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { User } from "src/user/entity/user.entity";
import { UserService } from "src/user/service/user.service";
import { LoginDto } from "../dto/login.dto";
import { RegisterDto } from "../dto/registerDto";

export class AuthService {
  constructor(
    @Inject(UserService)
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  generateToken(user: User) {
    const pyload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }
    const token = this.jwtService.sign(pyload);

    return token;
  }

  async login(dto: LoginDto) {
    const user = await this.userService.getUserByEmail(dto.email);
    if (user && await bcrypt.compare(dto.password, user.password)) {
      return this.generateToken(user);
    }

    return false;

  }

  async register(dto: RegisterDto,) {
    const user = await this.userService.createUser(dto);
    if (user) {
      return this.generateToken(user);
    }

    return false;
  }
}