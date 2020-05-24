
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from '@nestjs/config';

import { ProjectModule } from 'src/Project/project.module';
import { AuthModule } from 'src/Auth/auth.module';
import { UserModule } from "src/User/user.module";

import { AuthService } from 'src/Auth/auth.service';
import { AppService } from "./app.service";

import { User } from "src/User/user.entity";
import { Project } from "src/Project/project.entity";

@Module({
  imports: [
    ProjectModule, 
    AuthModule, 
    UserModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "qwerty",
      database: "secret-project",
      entities: [User, Project],
      synchronize: true
    }),
    ConfigModule.forRoot()
  ],
  providers: [AppService]
})
export class AppModule {}
