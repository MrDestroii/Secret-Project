import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import CreateUserDTO from './dto/create-user.dto'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Post('create')
    create(@Body() createUserDTO: CreateUserDTO) {
      return this.userService.create(createUserDTO);
    }

    @Get('email')
    findByEmail(@Body() { email }) {
      return this.userService.findOneByEmail(email)
    }
}
