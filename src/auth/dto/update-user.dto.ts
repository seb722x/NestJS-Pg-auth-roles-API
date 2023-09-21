import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsOptional()
    fullName: string;
  
    @IsOptional()
    email: string;
  
    @IsOptional()
    password: string;
  
    @IsOptional()
    phone: string;
}