import { AuthService } from '../Auth/auth.service';
import { AuthModule } from '../Auth/auth.module';
import { UserModule } from "../User/user.module";
import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from '@nestjs/config';

import { User } from "../User/user.entity";

@Module({
  imports: [
    AuthModule, 
    UserModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "qwerty",
      database: "secret-project",
      entities: [User],
      synchronize: true
    }),
    ConfigModule.forRoot()
  ],
  providers: [AppService]
})
export class AppModule {}
