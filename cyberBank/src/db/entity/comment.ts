import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from "typeorm";
import { User } from "./user";
import { Product } from "./product";


@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id!: number

    @OneToOne(() => User)
    @JoinColumn()
    user!: User

    @OneToOne(() => Product)
    @JoinColumn()
    product!: Product

    @Column({length: 100})
    content!: string

    @Column()
    created!: string
}