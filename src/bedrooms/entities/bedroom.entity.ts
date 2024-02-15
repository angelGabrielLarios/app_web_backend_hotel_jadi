import { Reservation } from "src/reservations/entities/reservation.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'bedrooms'
})
export class Bedroom {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'float',

    })
    price_for_one_night: number


    @Column({
        type: 'int',

    })
    num_beds: number

    @Column({
        type: 'int',

    })
    num_restroom: number

    @OneToMany(() => Reservation, (reservation) => reservation.bedroom)
    reservations: Reservation[]

}
