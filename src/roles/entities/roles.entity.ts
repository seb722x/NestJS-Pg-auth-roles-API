import {  Column, Entity,  OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { User } from '../../auth/entities/user.entity';

@Entity({ name: 'roles' })
export class Roles {

    @ApiProperty({
        example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
        description: 'Product ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'admin',
        description: 'roles',
        uniqueItems: true
    })
    @Column('text', {
        unique: true,
    })
    name: string;

    @ApiProperty({
        example: false,
        description: 'this is deleted: true',
    })
    @Column('bool', {
        default: false
    })
    isDeleted: boolean;

    @ApiProperty({
        example:  "2023-09-21T10:15:37.823Z",
        description: 'date of created',
        default: null,
    })
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ApiProperty({
        example:  "2023-09-21T10:15:37.823Z",
        description: 'date of updated',
        default: null,
    })
    @Column({ type: 'timestamp', nullable: true })
    updatedAt: Date;


    @OneToMany(() => User, user => user.role) 
    users: User[]; 
    


}
