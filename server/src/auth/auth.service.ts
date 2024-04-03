import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}

  async signUp(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      throw new BadRequestException({ type: 'email-exist' });
    }
    const salt = this.passwordService.generateSalt();

    const hash = this.passwordService.generateHash(password, salt);

    const newUser = await this.userService.createUser(email, hash, salt);

    const accessToken = await this.jwtService.signAsync({
      id: newUser.id,
      email: newUser.email,
    });
    // console.log(accessToken);
    return { accessToken };
  }

  async signIn(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException({ type: 'email-dont-exist' });
    }
    const hash = this.passwordService.generateHash(password, user.salt);

    if (hash !== user.hash) {
      throw new UnauthorizedException({ type: 'wrong-password' });
    }

    const accessToken = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
    });
    // console.log(accessToken);
    return { accessToken };
  }
}
