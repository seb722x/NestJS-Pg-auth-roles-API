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
        example: 'T-Shirt Teslo',
        description: 'Product Title',
        uniqueItems: true
    })
    @Column('text', {
        unique: true,
    })
    name: string;

    @ApiProperty({
        example: true,
        description: 'Product price',
    })
    
    @Column('bool', {
        default: false
    })
    isDeleted: boolean;

    @ApiProperty({
        example: 'Anim reprehenderit nulla in anim mollit minim irure commodo.',
        description: 'Product description',
        default: null,
    })
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;


    @Column({ type: 'timestamp', nullable: true })
    updatedAt: Date;


    @OneToMany(() => User, user => user.role) 
    users: User[]; 
    


}
