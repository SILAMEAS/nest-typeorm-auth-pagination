import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, Unique, UpdateDateColumn } from "typeorm";
import { Roles } from "../../utils/common/user-role.enum";
@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id:number
  @Column()
  name:string
  @Column({unique:true,nullable:false})
  email:string
  @Column({select:false})
  password:string
  @Column({type:'enum',enum:Roles,array:true,default:[Roles.USER]})
  roles:Roles[]
  @CreateDateColumn()
  createdAt:Timestamp
  @UpdateDateColumn()
  updatedAt:Timestamp
}
