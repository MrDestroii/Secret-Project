import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { HttpException, HttpStatus } from '@nestjs/common';


@EntityRepository(User)
export class UserRepository extends Repository<User> {
    constructor() {
        super()
    }
    async findByEmail(email: string) {
        const user = await this.findOne(null, {
            select: ["name", "email", "id", "password"],
            where: {
                email
            }
        })

        if(user) {
            return user
        } else {
            throw new HttpException(`User with email: ${email} not found`, HttpStatus.NOT_FOUND)
        }
    }
}
