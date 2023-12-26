import { Section } from "src/sections/entities/section.entity";
import { User } from "src/users/entities/user.entity";
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'sections_visited'
})
export class SectionsVisited {
    @PrimaryGeneratedColumn('uuid')
    id: string


    @CreateDateColumn()
    createdDate: Date


    @ManyToOne(() => User, (user) => user.sections_visited)
    user: User


    @ManyToOne(() => Section, (section) => section.sections_visited)
    section: Section
}
