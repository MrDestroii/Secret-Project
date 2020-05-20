import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { UserService } from "../User/user.service";
import { JwtService } from "@nestjs/jwt";
import CreateUserDTO from "src/User/dto/create-user.dto";
import * as R from 'ramda'
import { User } from "src/User/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user: User = await this.userService.findOneByEmail(email);
    if (user.password === pass) {
      return user;
    } else {
      throw new HttpException("Bab Request", HttpStatus.BAD_REQUEST);
    }
  }

  async login(user: User) {
    const payload = { username: user.email, sub: user.password };
    return {
      user,
      access_token: this.jwtService.sign(payload)
    };
  }

  async register(createUserDTO: CreateUserDTO) {
    const newUser = await this.userService.create(createUserDTO)
    return newUser
  }
}
