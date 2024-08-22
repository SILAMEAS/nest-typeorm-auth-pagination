import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from "../../utils/common/user-role.enum";
import { AbstractEntity } from "../../utils/abstract/AbstractEntity";
import { ApiProperty } from "@nestjs/swagger";
import { ProductEntity } from '../../product/entities/product.entity';
import { CategoryEntity } from '../../category/entities/category.entity';

@Entity('users')
export class UserEntity extends AbstractEntity{
  @Column()
  @ApiProperty()
  name:string
  @Column({unique:true,nullable:false})
  @ApiProperty()
  email:string
  @Column({select:false})
  @ApiProperty()
  password:string
  @Column({type:'enum',enum:Roles,array:true,default:[Roles.USER]})
  @ApiProperty()
  roles:Roles[]
  @OneToMany(() => ProductEntity, (product) => product.createdBy)
  products: ProductEntity[];
  @OneToMany(() => CategoryEntity, (category) => category.user)
  categories: CategoryEntity[];
}
