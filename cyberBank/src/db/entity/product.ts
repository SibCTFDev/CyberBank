import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from "typeorm";
import { User } from "./user";


@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({length: 300})
    description!: string

    @Column({length: 300, unique: true})
    content!: string

    @OneToOne(() => User)
    @JoinColumn()
    owner!: User

    @Column()
    price!: number

    @Column()
    image_path!: string

    @Column()
    created!: string

    @Column({nullable: true})
    updated!: string
}