import { IsInt, IsNumber } from "class-validator"

export class UpdateCartDetailQuantity {
    @IsNumber()
    @IsInt()
    quantity: number


}
