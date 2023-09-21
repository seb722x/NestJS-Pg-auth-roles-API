// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateRolDTO } from './create-rol.dto';

export class UpdateRolDTO extends PartialType(CreateRolDTO) {}
