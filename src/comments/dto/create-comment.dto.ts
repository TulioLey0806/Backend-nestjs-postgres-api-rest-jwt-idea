import { IsOptional, IsString, MinLength } from "class-validator";

export class CreateCommentDto {

    @IsString()
    @MinLength(1)
    contents: string;

    // @IsInt()
    // @IsPositive()
    // ideaId: number;   

    @IsString()
    @IsOptional()
    idea?: string;

    // @IsString()
    // @IsOptional()
    // user?: string;   
}
