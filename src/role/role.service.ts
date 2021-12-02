import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleService extends AbstractService {
    constructor(
        @InjectRepository(Role) private readonly roleRepositoy: Repository<Role>
    ){
        super(roleRepositoy);
    }
    // async all(): Promise<Role[]> {
    //     return this.roleRepositoy.find();
    // }
    // async create(data): Promise<Role>{
    //     return this.roleRepositoy.save(data);
    // }
    // async findOne(condition): Promise<Role> {
    //     return this.roleRepositoy.findOne(condition,{relations: ['permissions']});
    // }
    // async update(id: number, data): Promise<any>{
    //     return this.roleRepositoy.update(id, data);
    // }
    // async delete(id: number): Promise<any>{
    //     return this.roleRepositoy.delete(id);
    // }
}
