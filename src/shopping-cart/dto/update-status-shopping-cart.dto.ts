import { IsEnum } from "class-validator";
import { StatusEnum } from "../entities/shopping-cart.entity";

export class UpdateStatusShoppingCartDto {
    @IsEnum(StatusEnum)
    status: StatusEnum
}