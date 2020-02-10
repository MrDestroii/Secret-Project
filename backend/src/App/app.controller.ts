import { Controller, UseGuards, Request, Post} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../Auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
