


import { Reservation } from "src/reservations/entities/reservation.entity";
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


    @OneToMany(() => Reservation, (reservation) => reservation.user)
    reservations: Reservation[]

}




