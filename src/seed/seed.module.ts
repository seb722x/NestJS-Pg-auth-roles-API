import { Module } from '@nestjs/common';

import { AuthModule } from './../auth/auth.module';

import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    RolesModule,
    AuthModule,
  ]
})
export class SeedModule {}
