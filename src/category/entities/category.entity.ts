import { AbstractEntity } from "../../utils/abstract/AbstractEntity";
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ProductEntity } from "../../product/entities/product.entity";
import { UserEntity } from '../../users/entities/user.entity';
@Entity('categories')
export class CategoryEntity extends AbstractEntity{
  @Column()
  name:string
  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[];
  @ManyToOne(() => UserEntity, (user) => user.categories)
  user: UserEntity;
}
