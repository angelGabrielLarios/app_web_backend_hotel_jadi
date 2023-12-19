import { Token } from "src/tokens/entities/token.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'users'
})
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 100
    })
    firstName: string

    @Column({
        type: 'varchar',
        length: 100
    })
    lastName: string

    @Column({
        type: 'varchar',
        length: 120,
        unique: true
    })
    email: string


    @Column({
        type: 'varchar',
        length: 20
    })
    phone: string


    @Column({
        type: 'text'
    })

    password: string


    @OneToMany(() => Token, (token) => token.user)
    tokens: Token[]
}




