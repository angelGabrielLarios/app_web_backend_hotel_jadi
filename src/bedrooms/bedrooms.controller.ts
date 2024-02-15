import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BedroomsService } from './bedrooms.service';
import { CreateBedroomDto } from './dto/create-bedroom.dto';
import { UpdateBedroomDto } from './dto/update-bedroom.dto';

@Controller('bedrooms')
export class BedroomsController {
  constructor(private readonly bedroomsService: BedroomsService) {}

  @Post()
  create(@Body() createBedroomDto: CreateBedroomDto) {
    return this.bedroomsService.create(createBedroomDto);
  }

  @Get()
  findAll() {
    return this.bedroomsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bedroomsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBedroomDto: UpdateBedroomDto) {
    return this.bedroomsService.update(+id, updateBedroomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bedroomsService.remove(+id);
  }
}
