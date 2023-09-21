import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, ParseUUIDPipe, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { LoginUserDto, CreateUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
   
    private readonly jwtService: JwtService,
  ) {}


  async create( createUserDto: CreateUserDto) {
    
    try {

      const { password, ...userData } = createUserDto;
      
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync( password, 10 )
      });

      await this.userRepository.save( user )
      delete user.password;

      return {
        ...user,
        token: this.getJwtToken({ id: user.id })
      };
    

    } catch (error) {
      this.handleDBErrors(error);
    }

  }

  async login( loginUserDto: LoginUserDto ) {

    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true } //! OJO!
    });

    if ( !user ) 
      throw new UnauthorizedException('Credentials are not valid (email)');
      
    if ( !bcrypt.compareSync( password, user.password ) )
      throw new UnauthorizedException('Credentials are not valid (password)');

    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    };
  }

  async delete(term: string,isDeleted:boolean): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({id:term});
  
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      user.isDeleted = isDeleted;
      await this.userRepository.save(user);
      return user
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async update(term: string, updateUserDto) {
    try {
      const existingUser = await this.userRepository.findOne({ where: { id: term } });
  
      if (!existingUser) {
        throw new NotFoundException(`User with id: ${term} not found`);
      }
  
      for (const key in updateUserDto) {
        if (updateUserDto[key] !== undefined) {
          existingUser[key] = updateUserDto[key];
        }
      }

      const currentDate = new Date();
      existingUser.updatedAt = currentDate;

      await this.userRepository.save(existingUser);
  
      return existingUser;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }




  async checkAuthStatus( user: User ){

    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    };

  }


  
  private getJwtToken( payload: JwtPayload ) {

    const token = this.jwtService.sign( payload );
    return token;

  }

  private handleDBErrors( error: any ): never {


    if ( error.code === '23505' ) 
      throw new BadRequestException( error.detail );

    console.log(error)

    throw new InternalServerErrorException('Please check server logs');

  }


}

