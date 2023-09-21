import { ApiProperty } from '@nestjs/swagger';
import {   IsString, MinLength } from 'class-validator';


export class CreateRolDTO {

    @ApiProperty({
        description: 'Product title (unique)',
        nullable: false,
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    name: string;

    


}
