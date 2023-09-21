import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateRolDTO } from './dto/create-rol.dto';
import { UpdateRolDTO } from './dto/update-rol.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

import { validate as isUUID } from 'uuid';
import { Roles } from './entities';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class RolesService {

  private readonly logger = new Logger('ProductsService',);

  constructor(

    @InjectRepository(Roles)
    private readonly roleRepository: Repository<Roles>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}


  async create( createRolDTO: CreateRolDTO) {
    
    try {
      const { name } = createRolDTO;
      const rol = this.roleRepository.create({ name });
      await this.roleRepository.save( rol )
      return { rol };

    }catch (error) {
      return this.handleDBExceptions(error)
    }

  }


  async assignRoleToUser(userId: string, roleName: string) {
    
    try {
    const user = await this.userRepository.findOneBy({id:userId});
     if (!user) {
      throw new Error('User not found');
     }

    const role = await this.roleRepository.findOneBy({ name: roleName }); // Busca el rol por nombre
     if (!role) {
      throw new Error('Role not found');
     }
    user.role = role; 
    await this.userRepository.save(user);
    return user.role

    } catch(error){
      return this.handleDBExceptions(error)
    }
    
  }

  async findAll( paginationDto: PaginationDto ) {

    try{
      const { limit = 10, offset = 0 } = paginationDto;

      const roles = await this.roleRepository.find({
      take: limit,
      skip: offset,
      })

      return roles
    }catch(error){
      return this.handleDBExceptions(error)
    }
  }

  async findOne( term: string ) {

    let roles: Roles;
    roles = await this.roleRepository.findOneBy({ id: term });
  
    if ( !roles ) 
      throw new NotFoundException(`Product with ${ term } not found`);

    return roles;
  }

  async findOnePlain( term: string ) {
    try{
      const { ...rest } = await this.findOne( term );
      return { ...rest };

    } catch(error){
      return this.handleDBExceptions(error);
    }
  }

  async remove(id: string,isDeleted:boolean) {
   try{
    const role = await this.findOne( id );
    role.isDeleted = isDeleted
    await this.roleRepository.save(role);
    return role
   }catch(error){
      this.handleDBExceptions(error);
   }
  }

  async update(term: string, updateName:string) {
    try {
      
      const rol = await this.roleRepository.findOne({ where: { id: term } });
  
      if (!rol) {
        throw new NotFoundException(`User with id: ${term} not found`);
      }
  
      rol.name = updateName
      const currentDate = new Date();
      rol.updatedAt = currentDate;

      await this.userRepository.save(rol);
  
      return rol;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }


  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }



}





