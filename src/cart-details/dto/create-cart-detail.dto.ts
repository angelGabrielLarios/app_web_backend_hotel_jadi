import { IsNumber, IsString } from "class-validator"

export class CreateCartDetailDto {
    @IsNumber()
    quantity: number

    @IsString()
    status: string

    @IsString()
    idShoppingCart: string

    @IsString()
    idProduct: string
}
