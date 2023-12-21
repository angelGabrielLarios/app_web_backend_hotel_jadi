import { Product } from "src/products/entities/product.entity";
import { ShoppingCart } from "src/shopping-cart/entities/shopping-cart.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'cart_details'
})
export class CartDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string


    @Column({
        type: 'int'
    })
    quantity: number

    @Column({
        type: 'varchar'
    })
    status: string


    @ManyToOne(() => ShoppingCart, shoppingCart => shoppingCart.cartDetails)
    shoppingCart: ShoppingCart



    @ManyToOne(() => Product, (product) => product.cartDetails)
    product: Product
}
