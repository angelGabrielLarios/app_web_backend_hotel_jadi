import { IsNumber, IsString } from "class-validator";

export class CreateProductPaypalDto {
    @IsString()
    name: string

    @IsString()
    description: string

    @IsNumber()
    price: number


    @IsNumber()
    quantity: number

}