import { CartDetail } from "src/cart-details/entities/cart-detail.entity";
import { User } from "src/users/entities/user.entity";
import { CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'shopping_cart'
})
export class ShoppingCart {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @CreateDateColumn()
    createdDate: Date


    @ManyToOne(() => User, (user) => user.shoppingsCarts)
    user: User


    @OneToMany(() => CartDetail, cartDetails => cartDetails.shoppingCart)
    cartDetails: CartDetail[]
}
