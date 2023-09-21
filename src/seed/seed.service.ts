import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { initialData } from './seed-data';
import { User } from '../auth/entities/user.entity';
import { RolesService } from 'src/roles/roles.service';


@Injectable()
export class SeedService {

  constructor(
    private readonly roleService: RolesService,

    @InjectRepository( User )
    private readonly userRepository: Repository<User>
  ) {}


  async runSeed() {


    await this.insertUsers();
    await this.insertNewRoles( );

    return 'SEED EXECUTED';
  }



  private async insertUsers() {

    const seedUsers = initialData.users;
    
    const users: User[] = [];

    seedUsers.forEach( user => {
      users.push( this.userRepository.create( user ) )
    });

    const dbUsers = await this.userRepository.save( seedUsers )

    return dbUsers[0];
  }


  private async insertNewRoles( ) {

    const roles = initialData.roles;

    const insertPromises = [];

    roles.forEach( role => {
      insertPromises.push( this.roleService.create( role ) );
    });

    await Promise.all( insertPromises );


    return true;
  }


}
