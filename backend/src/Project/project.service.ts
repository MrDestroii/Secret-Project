import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
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
        user: query.user,
      },
    });
  }

  create(project: CreateProjectDTO, user: User): Promise<Project> {
    const createdProjectEntity = this.projectRepository.create({
      ...project,
      user,
    });
    return this.projectRepository.save(createdProjectEntity);
  }

  async remove(id: string): Promise<Project> {
    try {
      const currentProject = await this.projectRepository.findOneOrFail(id);

    if (currentProject) {
      const removedProject = await this.projectRepository.remove(
        currentProject
      );
      return {
        ...removedProject,
        id,
      };
    }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND)
    }
  }

  async update(id: string, project: CreateProjectDTO): Promise<Project> {
    try {
      await this.projectRepository.update(id, project);
      return this.projectRepository.findOneOrFail(id, {
        relations: ["user"],
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND)
    }
  }
}
