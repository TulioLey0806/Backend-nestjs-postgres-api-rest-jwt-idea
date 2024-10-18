import { IsOptional, IsString } from "class-validator";

export class CreateIdeaDto {

    @IsString()
    title: string;

    @IsString()
    contents: string;

    @IsString()
    @IsOptional()
    category?: string;
}
