import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Collation} from "../../enums/database/collation.enum";

@Entity()
export class Summoner extends BaseEntity {
    @PrimaryGeneratedColumn()
    summoner_id!: number;

    @Column({type: 'int'})
    player_id: number;

    @Column({type: 'varchar', length: 20, unique: true, collation: Collation.UTF_8_GENERAL})
    summoner_nickname: string;

    @Column({type: 'int', default: () => 0})
    summoner_experience: number;

    @Column({type: 'varchar', length: 70, collation: Collation.UTF_8_GENERAL})
    summoner_outfit: string;

    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    created_at: Date;

    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    updated_at: Date;

    constructor(
        playerId: number,
        summonerNickname: string,
        experience: number,
        outfitUrl: string
    ) {
        super();
        this.player_id = playerId;
        this.summoner_nickname = summonerNickname;
        this.summoner_experience = experience;
        this.summoner_outfit = outfitUrl;
        this.created_at = new Date();
        this.updated_at = new Date();
    }
}
