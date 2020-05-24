import { Controller, Get, UseGuards, Request, Post, Body } from "@nestjs/common";

import { JwtAuthGuard } from "src/Auth/jwt-auth.guard";

import { User } from "src/User/user.entity";

import { ProjectService } from "./project.service";
import CreateProjectDTO from "./dto/create-project.dto";

@Controller("project")
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(JwtAuthGuard)
  @Get("find")
  find(@Request() req: { user: User }) {
    return this.projectService.findAll({
      user: req.user
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post("create")
  create(@Body() body: CreateProjectDTO, @Request() req: { user: User}) {
    return this.projectService.create(body, req.user)
  }
}
