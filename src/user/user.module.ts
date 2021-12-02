import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { User } from './models/user,.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  // Menambahkan User Models
  imports:[
    TypeOrmModule.forFeature([User]),
    CommonModule,
    AuthModule
  ],
  // Menambahkan User Controller
  controllers: [UserController],
  // Menambahkan User Service
  providers: [UserService],
  // Menambahkan User Service
  exports: [UserService]
  
})
export class UserModule {}