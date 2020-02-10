import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { UserService } from "../User/user.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user.password === pass) {
      const { password, ...result } = user;
      return result;
    } else {
      throw new HttpException("Bab Request", HttpStatus.BAD_REQUEST);
    }
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
