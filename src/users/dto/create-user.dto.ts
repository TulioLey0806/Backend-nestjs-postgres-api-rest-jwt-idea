import { IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    email: string;
 
    @IsString()
    password: string;

    @IsString()
    @MinLength(3)
    name: string;
}
