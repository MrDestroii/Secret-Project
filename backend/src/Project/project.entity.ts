import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "src/User/user.entity";
import { BaseEntity } from "src/base.entity";

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column('varchar')
  name: string;

  @ManyToOne(type => User, user => user.projects)
  user: User
}