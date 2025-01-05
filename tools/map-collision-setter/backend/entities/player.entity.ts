import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Player extends BaseEntity {
    @PrimaryGeneratedColumn()
    player_id!: number;

    @Column({type: 'varchar', length: 40, unique: true, collation: 'utf-8'})
    player_login!: string;

    @Column({type: 'varchar', length: 40})
    player_password!: string;

    @Column({type: 'varchar', length: 40})
    player_email!: string;

    @Column({type: 'int'})
    player_status!: string;

    @Column({type: 'varchar', length: 40, default: null})
    player_token!: string|null;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    updated_at!: Date;
}
