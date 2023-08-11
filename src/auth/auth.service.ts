import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validarUsuario(username: string, password: string) {
    const user = await this.userService.findOneByEmail(username);
    if (!user) {
      throw new UnauthorizedException('Usuário ou Senha Inválidos');
    }
    if (user.password === password) {
      return await this.gerarToken(user);
    }
    throw new UnauthorizedException('Usuário ou Senha Inválidos');
  }
  async gerarToken(payload: User) {
    const accessToken = this.jwtService.sign(
      { email: payload.email },
      { secret: 'treinaweb1234', expiresIn: '30s' },
    );

    const refreshToken = this.jwtService.sign(
      { email: payload.email },
      { secret: 'refresh1234', expiresIn: '60s' },
    );
    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async reautenticar(body: any) {
    const payload: User = await this.verificarRefreshToken(body);
    return this.gerarToken(payload);
  }

  private async verificarRefreshToken(body: any) {
    const refreshToken = body.refresh_token;

    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const email = this.jwtService.decode(refreshToken)['email'];
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    try {
      this.jwtService.verify(refreshToken, {
        secret: 'refresh1234',
      });
      return user;
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Assinatura inválida');
      }
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token Expirado');
      }
      throw new UnauthorizedException(err.name);
    }
  }
}
