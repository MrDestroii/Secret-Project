import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Exclude, classToPlain } from 'class-transformer'
import { BaseEntity } from "src/base.entity";
import { Project } from "src/Project/project.entity";

@Entity()
export class User extends BaseEntity{
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

    @OneToMany(type => Project, project => project.user)
    projects: Project[]

    toJSON() {
      return classToPlain(this);
    }
}