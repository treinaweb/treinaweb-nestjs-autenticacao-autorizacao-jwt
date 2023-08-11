import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() userDto: CreateUserDto) {
    return this.authService.validarUsuario(userDto.email, userDto.password);
  }

  @Post('refresh')
  async reautenticar(@Body() body) {
    return this.authService.reautenticar(body);
  }
}
