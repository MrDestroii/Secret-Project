import { Controller, Get, UseGuards, Request, Post, Body, Delete, Patch, UsePipes, ValidationPipe, Param, Query, Put } from "@nestjs/common";

import { JwtAuthGuard } from "src/Auth/jwt-auth.guard";

import { User as UserEntity } from "src/User/user.entity";
import { User } from "src/decorators/user.decorator"

import { ProjectService } from "./project.service";
import CreateProjectDTO from "./dto/create-project.dto";

@Controller("project")
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  find(@User() user: UserEntity, @Query() query: { page: number, limit: number }) {
    return this.projectService.findAll({
      user,
      ...query
    });
  }

  
  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() body: CreateProjectDTO, @User() user: UserEntity) {
    return this.projectService.create(body, user)
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Query('id') id: string) {
    return this.projectService.remove(id)
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Body() body: CreateProjectDTO, @Query('id') id: string) {
    return this.projectService.update(id, body)
  }
}
