import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SectionsVisitedService } from './sections_visited.service';
import { CreateSectionsVisitedDto } from './dto/create-sections_visited.dto';
import { UpdateSectionsVisitedDto } from './dto/update-sections_visited.dto';

@Controller('sections-visited')
export class SectionsVisitedController {
  constructor(private readonly sectionsVisitedService: SectionsVisitedService) { }

  @Post()
  create(@Body() createSectionsVisitedDto: CreateSectionsVisitedDto) {
    return this.sectionsVisitedService.create(createSectionsVisitedDto);
  }

  @Get('userId/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.sectionsVisitedService.findByUserId({ userId })
  }

  @Get()
  findAll() {
    return this.sectionsVisitedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectionsVisitedService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSectionsVisitedDto: UpdateSectionsVisitedDto) {
    return this.sectionsVisitedService.update(+id, updateSectionsVisitedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sectionsVisitedService.remove(+id);
  }
}
