import { Product } from "src/products/entities/product.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'sections'
})
export class Section {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'varchar',
        length: 100,
        unique: true
    })
    name: string

    @CreateDateColumn()
    createdDate: Date

    @OneToMany(() => Product, product => product.section)
    products: Product[];
}
