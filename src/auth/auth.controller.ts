import { BadRequestException, Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/user/entity/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/registerDto';
import { AuthService } from './service/auth.service';



@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @ApiOkResponse({
    schema: {
      allOf: [
        {
          properties: {
            accessToken: {
              type: 'string',
            }
          },
        },
      ],
    },
  })
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {

    const token = await this.authService.login(loginDto);

    if (token) {
      return {
        accessToken: token
      }
    }

    throw new BadRequestException();

  }

  @ApiOkResponse({
    schema: {
      allOf: [
        {
          properties: {
            accessToken: {
              type: 'string',
            }
          },
        },
      ],
    },
  })
  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    console.log('fassf');
    const token = await this.authService.register(registerDto);
    if (token) {
      return {
        accessToken: token
      }
    }

    throw new BadRequestException();
  }

  @Get('/get-user')
  @ApiResponse({ type: User })
  @UseGuards(AuthGuard('jwt'))
  async getUser(@Request() req) {
    return req.user;
  }

}
