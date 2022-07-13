import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayLoad } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserdto: CreateUserDto): Promise<User> {
    const { username, password } = createUserdto;
    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());
    const user = this.userRepository.create({
      username: username,
      password: hashedPassword,
    });
    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error.code == 23505) {
        throw new ConflictException('Username Already exists');
      } else {
        throw new Error('Some other error');
      }
    }
    return user;
  }

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    //if complete
    const { username, password } = signInDto;
    const founduser = await this.userRepository.findOneBy({
      username: username,
    });
    if (founduser && (await bcrypt.compare(password, founduser.password))) {
      const payload: JwtPayLoad = { username: username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Wrong credentials. Try again');
    }
  }
}
