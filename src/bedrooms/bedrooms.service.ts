import { Injectable } from '@nestjs/common';
import { CreateBedroomDto } from './dto/create-bedroom.dto';
import { UpdateBedroomDto } from './dto/update-bedroom.dto';

@Injectable()
export class BedroomsService {
  create(createBedroomDto: CreateBedroomDto) {
    return 'This action adds a new bedroom';
  }

  findAll() {
    return `This action returns all bedrooms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bedroom`;
  }

  update(id: number, updateBedroomDto: UpdateBedroomDto) {
    return `This action updates a #${id} bedroom`;
  }

  remove(id: number) {
    return `This action removes a #${id} bedroom`;
  }
}
