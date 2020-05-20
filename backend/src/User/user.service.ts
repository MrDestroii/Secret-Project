import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import CreateUserDTO from './dto/create-user.dto'
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private readonly userRepository: UserRepository
  ) {}

  private saltRounds = 10;

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    createUserDTO.password = await this.getHash(createUserDTO.password)
    const createdUserEntity = this.userRepository.create(createUserDTO);
    const createdUser = await this.userRepository.save(createdUserEntity);

    return createdUser;
  }

  async findOneByEmail(email: string): Promise<User> {
    const findedUser = await this.userRepository.findByEmail(email)
    return findedUser;
  }

  async getHash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds)
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }
}
