import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Player {
    @PrimaryGeneratedColumn()
    player_id: number

    @Column()
    player_login: string

    @Column()
    player_password: string
}
