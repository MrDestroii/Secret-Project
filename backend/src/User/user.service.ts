import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import CreateUserDTO from './dto/create-user.dto'
import { UserRepository } from './user.repository';
import { serialize } from "v8";
import { classToPlain } from "class-transformer";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private readonly userRepository: UserRepository
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    const createdUserEntity = this.userRepository.create(createUserDTO);
    const createdUser = await this.userRepository.save(createdUserEntity);

    return createdUser;
  }

  async findOneByEmail(email: string): Promise<User> {
    const findedUser = await this.userRepository.findByEmail(email)
    return findedUser;
  }
}
