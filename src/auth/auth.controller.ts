import { Controller, Get, Post, Body, UseGuards, Req, Headers, SetMetadata, Delete, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from './guards/user-role.guard';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {  GetUser, Auth } from './decorators';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { ValidRoles } from './interfaces';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
    ) {}



  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto ) {
    return this.authService.create( createUserDto );
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto ) {
    return this.authService.login( loginUserDto );
  }
  
  @Delete('delete/:id')
  deleteUser(@Param('id', ParseUUIDPipe ) id: string,@Body() body: { isDeleted: boolean }) {
    return this.authService.delete( id,body.isDeleted );
  }

  @Patch('update/:id')
  @Auth( ValidRoles.superUser )
  updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto:UpdateUserDto) {
    return this.authService.update(id, updateUserDto);
  }



  @Get('check-status')
  @Auth()
  checkAuthStatus(
    @GetUser() user: User
  ) {
    return this.authService.checkAuthStatus( user );
  }



  @Get('admin')
  @Auth( ValidRoles.admin )
  privateRoute1(
    @GetUser() user: User
  ) {

    return {
      ok: true,
      user
    }
  }

  @Get('super-admin')
  @Auth( ValidRoles.superUser )
  privateRoute2(
    @GetUser() user: User
  ) {

    return {
      ok: true,
      user
    }
  }

  @Get('user')
  @Auth( ValidRoles.user )
  privateRoute3(
    @GetUser() user: User
  ) {

    return {
      ok: true,
      user
    }
  }


}
