import { Controller, Get, } from '@nestjs/common';

import { ValidRoles } from '../auth/interfaces';
import { Auth } from '../auth/decorators';

import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  // @Auth( ValidRoles.admin )
  executeSeed() {
    console.log("hola")
    return this.seedService.runSeed()
  }
}
