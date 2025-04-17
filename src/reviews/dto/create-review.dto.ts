import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateReviewDto {
    @IsNotEmpty({message: 'Product should not be empty'})
    @IsNumber({}, {message: 'ProductId must be a number'})
    productId:number
    @IsNotEmpty({message: 'Ratings should not be empty'})
    @IsNumber({}, {message: 'Ratings must be a number'})
    ratings:number
    @IsNotEmpty({message: 'Comment should not be empty'})
    @IsString({message: 'Comment must be a string'})
    comment:string
}
