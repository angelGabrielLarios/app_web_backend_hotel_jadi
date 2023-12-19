import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { Section } from './entities/section.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SectionsService {

  constructor(
    @InjectRepository(Section)
    private sectionRepository: Repository<Section>
  ) { }
  async save(createSectionDto: CreateSectionDto) {

    const existPrevSection = await this.findOneByName({ name: createSectionDto.name })
    if (existPrevSection) {
      throw new BadRequestException(`There_is_already_a_section`, `there cannot be repeated sections`)
    }

    const section = await this.sectionRepository.save(createSectionDto)
    return section
  }



  async findAll() {
    const sections = await this.sectionRepository.find()
    return sections
  }

  async findOneByName({ name }: { name: string }) {
    const section = await this.sectionRepository.findOneBy({ name })

    return section

  }

  async findOneById({ id }: { id: string }) {
    const section = await this.sectionRepository.findOneBy({ id })
    return section

  }

  update(id: number, updateSectionDto: UpdateSectionDto) {
    console.log(updateSectionDto)
    return `This action updates a #${id} section`;
  }

  remove(id: number) {
    return `This action removes a #${id} section`;
  }
}
