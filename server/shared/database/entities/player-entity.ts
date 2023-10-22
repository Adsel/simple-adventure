import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Player extends BaseEntity {
    @PrimaryGeneratedColumn()
    player_id: number;

    @Column()
    player_login: string;

    @Column()
    player_password: string;

    @Column()
    player_token: string;
}
