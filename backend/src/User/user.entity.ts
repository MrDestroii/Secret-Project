import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Exclude, classToPlain } from 'class-transformer'

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    name: string;

    @Column('varchar', {
        unique: true,
    })
    email: string;

    @Column('varchar')
    @Exclude({ toPlainOnly: true })
    password: string;

    toJSON() {
      return classToPlain(this);
    }
}