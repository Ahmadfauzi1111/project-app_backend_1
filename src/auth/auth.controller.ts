import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, NotFoundException, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './models/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Request,Response } from 'express';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {
constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private authService: AuthService
    ){
}

    @Post('register')
    async register(@Body() body: RegisterDto){
        // Buat Validation 
        if(body.password !== body.password_confirm) {
            throw new BadRequestException('password do not match');
        }
        // Buat ngeBcrypt                    
        const hash = await bcrypt.hash(body.password, 12);
        return this.userService.create({
            first_name : body.first_name,
            last_name : body.last_name,
            email : body.email,
            password : hash,
            role: {id:2}
        });
    }
    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({passthrough: true}) response: Response
    ){
        const user = await this.userService.findOne({email});

        if(!user){
            throw new NotFoundException('User Not Found');
        }

        if(!await bcrypt.compare(password, user.password)){
            throw new BadRequestException('Invalid Credentials');
        }
        const jwt = await this.jwtService.signAsync({id: user.id});
        response.cookie('jwt', jwt, {httpOnly: true});
        return user;
    }
    
    @UseGuards(AuthGuard)
    @Get('user')
    async user(@Req()request: Request){
        const id= await this.authService.userId(request);
         
        return this.userService.findOne(id);
        // return data;
    }
    @UseGuards(AuthGuard)
    @Post('Logout')
    async logout(@Res({passthrough: true})response: Response){
        response.clearCookie('jwt');
        return {
            message: 'Succes Logout'
        }
    }
}