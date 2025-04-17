import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty({message: 'Title is required'})
        @IsString( {message: 'Title must be string'})
        title: string;
     @IsNotEmpty({message: 'Description is required'})
        @IsString( {message: 'Description must be string'})
        description: string;
}
