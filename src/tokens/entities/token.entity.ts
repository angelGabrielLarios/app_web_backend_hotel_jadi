import { User } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity({
    name: 'tokens'
})
export class Token {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'text'
    })
    token: string


    @ManyToOne(() => User, (user) => user.tokens)
    user: User
}
