import { IsString } from "class-validator"

export class CreateUserDto {

    @IsString()
    firstName: string

    @IsString()
    lastName: string

    @IsString()
    email: string

    @IsString()
    address: string

    @IsString()
    phone: string

    @IsString()
    password: string
}
