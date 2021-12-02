import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PermissionService } from './permission.service';

@Controller('permissions')
export class PermissionController {
    constructor(private permissionService: PermissionService){
    }
    @Get()
    async all(){
        return this.permissionService.all();
    }
}
