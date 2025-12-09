import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryColumn("uuid")
    id!: string;

    @Column({ type: 'text' })
    name!: string
}