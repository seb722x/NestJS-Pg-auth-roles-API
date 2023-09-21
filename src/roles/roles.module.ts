import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';

import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

import { Roles } from './entities';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    TypeOrmModule.forFeature([ Roles ]),
    AuthModule,
  ],
  exports: [
    RolesService,
    TypeOrmModule,
  ]
})
export class RolesModule {}
