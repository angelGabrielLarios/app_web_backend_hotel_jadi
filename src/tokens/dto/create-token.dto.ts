import { IsString } from "class-validator";

export class CreateTokenDto {
    @IsString()
    email: string
}
