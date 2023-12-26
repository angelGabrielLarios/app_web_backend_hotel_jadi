import { Injectable } from '@nestjs/common';
import { CreateSectionsVisitedDto } from './dto/create-sections_visited.dto';
import { UpdateSectionsVisitedDto } from './dto/update-sections_visited.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SectionsVisited } from './entities/sections_visited.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SectionsVisitedService {

  constructor(
    @InjectRepository(SectionsVisited)
    private sectionVisitedRepository: Repository<SectionsVisited>
  ) { }


  async create(createSectionsVisitedDto: CreateSectionsVisitedDto) {
    const sectionsVisitedRef = await this.sectionVisitedRepository.create({
      section: { id: createSectionsVisitedDto.sectionId },
      user: { id: createSectionsVisitedDto.userId }
    })
    const sectionsVisited = await this.sectionVisitedRepository.save(sectionsVisitedRef)

    return sectionsVisited

  }

  findAll() {
    return `This action returns all sectionsVisited`;
  }

  async findByUserId({ userId }: { userId: string }) {
    const sectionsVisited = await this.sectionVisitedRepository.find({
      relations: {
        section: true
      },
      order: {
        createdDate: 'DESC'
      },
      where: {
        user: {
          id: userId
        }
      }
    })

    return sectionsVisited
  }

  findOne(id: number) {
    return `This action returns a #${id} sectionsVisited`;
  }


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateSectionsVisitedDto: UpdateSectionsVisitedDto) {
    return `This action updates a #${id} sectionsVisited`;
  }

  remove(id: number) {
    return `This action removes a #${id} sectionsVisited`;
  }
}
