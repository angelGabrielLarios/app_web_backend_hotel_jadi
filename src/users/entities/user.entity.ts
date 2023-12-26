import { SectionsVisited } from "src/sections_visited/entities/sections_visited.entity";
import { ShoppingCart } from "src/shopping-cart/entities/shopping-cart.entity";
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
        type: 'text'
    })
    address: string

    @Column({
        type: 'varchar',
        length: 120,
        unique: true
    })
    email: string


    @Column({
        type: 'varchar',
        length: 20,
        unique: true
    })
    phone: string


    @Column({
        type: 'text'
    })
    password: string


    @OneToMany(() => Token, (token) => token.user)
    tokens: Token[]


    @OneToMany(() => ShoppingCart, (shoppingCart) => shoppingCart.user)
    shoppingsCarts: ShoppingCart[]

    @OneToMany(() => SectionsVisited, (sectionsVisited) => sectionsVisited.user)
    sections_visited: SectionsVisited[]

}




