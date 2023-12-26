import { Module } from '@nestjs/common';
import { SectionsVisitedService } from './sections_visited.service';
import { SectionsVisitedController } from './sections_visited.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionsVisited } from './entities/sections_visited.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SectionsVisited])],
  controllers: [SectionsVisitedController],
  providers: [SectionsVisitedService],
})
export class SectionsVisitedModule { }
