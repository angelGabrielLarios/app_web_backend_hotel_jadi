import { IsString } from "class-validator";

export class CreateShoppingCartDto {
    @IsString()
    idUser: string

    @IsString()
    idProduct: string


}
