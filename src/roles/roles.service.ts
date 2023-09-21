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

    } catch (error) {
      console.log(error)
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
    } catch(error){
      
    }
    
  }

  async findAll( paginationDto: PaginationDto ) {

    const { limit = 10, offset = 0 } = paginationDto;

    const roles = await this.roleRepository.find({
      take: limit,
      skip: offset,
      
    })

    return roles

    
  }

  async findOne( term: string ) {

    let roles: Roles;

    if ( isUUID(term) ) {
      roles = await this.roleRepository.findOneBy({ id: term });
    } else {
      const queryBuilder = this.roleRepository.createQueryBuilder('prod'); 

    }

    if ( !roles ) 
      throw new NotFoundException(`Product with ${ term } not found`);

    return roles;
  }

  async findOnePlain( term: string ) {
    const { ...rest } = await this.findOne( term );
    return { ...rest };

  }

  async remove(id: string,isDeleted:boolean) {
   
    const role = await this.findOne( id );
    role.isDeleted = isDeleted
    await this.roleRepository.save(role);
    return role
  }


  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }



}





