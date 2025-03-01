import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';

@Entity('map')
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

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}
