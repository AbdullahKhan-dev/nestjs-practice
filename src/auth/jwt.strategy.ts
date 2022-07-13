import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Repository } from 'typeorm';
import { JwtPayLoad } from './jwt-payload.interface';
import { User } from './user.entity';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      secretOrKey: 'mysecretkey',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(load): Promise<User> {
    const username = load.username;
    const user: User = await this.userRepository.findOneBy({
      username: username,
    });

    if (!user) {
      throw new UnauthorizedException();
    } else return user;
  }
}
