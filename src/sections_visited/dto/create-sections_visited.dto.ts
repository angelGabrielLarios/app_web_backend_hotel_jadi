import { IsString } from "class-validator"

export class CreateSectionsVisitedDto {

    @IsString()
    userId: string

    @IsString()
    sectionId: string
}
