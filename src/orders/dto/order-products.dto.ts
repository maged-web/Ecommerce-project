import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class OrderProductsDto {
    @IsNotEmpty({message: 'Product can not be empty'})
    id: number;
    @IsNumber({maxDecimalPlaces:2},{message: 'Product unit price must be a number and have a maximum of 2 decimal places'})
    @IsPositive({message: 'Product unit price must be a positive number'})
    product_unit_price: number;
    @IsNumber({},{message: 'Product quantity price must be a number'})
    @IsPositive({message: 'Product quantity price must be a positive number'})
    product_quantity: number;

}