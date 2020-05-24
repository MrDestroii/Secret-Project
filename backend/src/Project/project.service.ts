import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { User } from "src/User/user.entity";

import { Project } from "./project.entity";
import { ProjectRepository } from "./project.repository";
import CreateProjectDTO from "./dto/create-project.dto";

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectRepository)
    private readonly projectRepository: ProjectRepository
  ) {}

  findAll(query: { user: User }): Promise<Project[]> {
    return this.projectRepository.find({
      relations: ["user"],
      where: {
        user: query.user
      }
    });
  }

  create(project: CreateProjectDTO, user: User): Promise<Project> {
    const createdProjectEntity = this.projectRepository.create({
      ...project,
      user
    });
    return this.projectRepository.save(createdProjectEntity)
  }
}
