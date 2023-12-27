import { CartDetail } from "src/cart-details/entities/cart-detail.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum StatusEnum {
    complete = 'complete',
    pending = 'pending',
}

@Entity({
    name: 'shopping_cart'
})
export class ShoppingCart {
    @PrimaryGeneratedColumn('uuid')
    id: string


    @Column({
        type: 'enum',
        enum: StatusEnum,
        default: StatusEnum.pending

    })
    status: StatusEnum

    @CreateDateColumn()
    createdDate: Date


    @ManyToOne(() => User, (user) => user.shoppingsCarts)
    user: User


    @OneToMany(() => CartDetail, cartDetails => cartDetails.shoppingCart)
    cartDetails: CartDetail[]
}
