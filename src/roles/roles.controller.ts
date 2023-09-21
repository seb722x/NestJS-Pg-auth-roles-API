import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { RolesService } from './roles.service';
import { CreateRolDTO } from './dto/create-rol.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { ValidRoles } from 'src/auth/interfaces';
import { Auth } from 'src/auth/decorators';



@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService,
    ) {}

  @Post('create')
  //@Auth()
  create(
    @Body() createRolDTO: CreateRolDTO ) {
    return this.rolesService.create(createRolDTO );
  }

  @Get('find-all')
  findAll( @Query() paginationDto:PaginationDto ) {
    return this.rolesService.findAll( paginationDto );
  }

  @Get('find/:term')
  findOne(@Param( 'term' ) term: string) {
    return this.rolesService.findOnePlain( term );
  }

  

  @Delete('delete/:id')
  @Auth( ValidRoles.admin )
  remove(@Param('id', ParseUUIDPipe ) id: string, @Body() body: { isDeleted: boolean }) {
    return this.rolesService.remove( id , body.isDeleted);
  }

  @Post(':id/assign-role/:roleName')
  async assignRole(@Param('id') userId: string, @Param('roleName') roleName: string) {
    await this.rolesService.assignRoleToUser(userId, roleName);
  }
}
