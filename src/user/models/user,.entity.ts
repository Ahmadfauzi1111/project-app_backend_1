import { Exclude } from "class-transformer";
import { Role } from "src/role/role.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// Menambahkan Migrate ke Database Mysql dengan nama 'Users/' (Decoratpr)
@Entity('users')
export class User{
    // Membuat Primary
    @PrimaryGeneratedColumn()
    id:number;
    // Membuat Column
    @Column()
    first_name:string;
    // Membuat Column
    @Column()
    last_name:string;
    // Membuat Column dengan Unique
    @Column({unique:true})
    email:string;
    // Membuat Column
    @Column()
    @Exclude()
    password:string;

    @ManyToOne(()=> Role)
    @JoinColumn({name: 'role_id'})
    role: Role;
}