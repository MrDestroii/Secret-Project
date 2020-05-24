import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { UserService } from "../User/user.service";
import { JwtService } from "@nestjs/jwt";
import CreateUserDTO from "src/User/dto/create-user.dto";
import * as R from "ramda";
import { User } from "src/User/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    console.log({ email, pass})
    const user: User = await this.userService.findOneByEmail(email);
    console.log({ user })
    if (await this.userService.comparePassword(pass, user.password)) {
      return user;
    } else {
      throw new HttpException("Bab Request", HttpStatus.BAD_REQUEST);
    }
  }

  async login(user: User) {
    const payload = { username: user.email, sub: user.password };
    return {
      user,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(createUserDTO: CreateUserDTO) {
    try {
      const newUser = await this.userService.create(createUserDTO);
      return newUser;
    } catch (e) {
      if (R.compose(R.propEq("code", "23505"))(e)) {
        throw new HttpException(
          `User with email - ${createUserDTO.email} already exist`,
          HttpStatus.BAD_REQUEST
        );
      }
      throw new HttpException("Bab Request", HttpStatus.BAD_REQUEST);
    }
  }
}
