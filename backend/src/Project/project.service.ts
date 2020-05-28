import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { User } from "src/User/user.entity";

import { Project } from "./project.entity";
import { ProjectRepository } from "./project.repository";
import CreateProjectDTO from "./dto/create-project.dto";
import { DeleteResult } from "typeorm";
import { throws } from "assert";

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

  async remove(id: string): Promise<Project> {
    const currentProject = await this.projectRepository.findOne(id)
    
    if(currentProject) {
      const removedProject = await this.projectRepository.remove(currentProject)
      return {
        ...removedProject,
        id
      }
    }
  }
}
