import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Map extends BaseEntity {
    @PrimaryGeneratedColumn()
    map_id: number;

    @Column({ unique: true, collation: 'utf8_general_ci' })
    map_name: string;

    @Column()
    map_width: number;

    @Column()
    map_height: number;

    @Column()
    map_url: string;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    updated_at: Date;
}
