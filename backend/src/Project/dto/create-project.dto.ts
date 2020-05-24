import { MinLength, MaxLength, IsUUID } from "class-validator";

export default class CreateProjectDTO {
  constructor(name: string) {
    this.name = name;
  }
  
  @MinLength(5, {
    message: "Name is less than 5",
  })
  @MaxLength(15, {
    message: "Name is longer than 15",
  })
  readonly name: string;
}
