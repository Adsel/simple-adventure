import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Collation} from "../../enums/database/collation.enum";

@Entity()
export class Player extends BaseEntity {
    @PrimaryGeneratedColumn()
    player_id!: number;

    @Column({type: 'varchar', length: 40, unique: true, collation: Collation.UTF_8_GENERAL})
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
