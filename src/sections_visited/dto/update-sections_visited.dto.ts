import { PartialType } from '@nestjs/mapped-types';
import { CreateSectionsVisitedDto } from './create-sections_visited.dto';

export class UpdateSectionsVisitedDto extends PartialType(CreateSectionsVisitedDto) {}
