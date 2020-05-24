import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProjectController } from "./project.controller";
import { ProjectService } from "./project.service";

import { Project } from "./project.entity";
import { ProjectRepository } from "./project.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Project, ProjectRepository])],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
