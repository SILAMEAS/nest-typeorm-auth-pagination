import { AbstractEntity } from "../../utils/abstract/AbstractEntity";
import { Column, Entity, OneToMany } from "typeorm";
import { ProductEntity } from "../../product/entities/product.entity";
@Entity('categories')
export class CategoryEntity extends AbstractEntity{
  @Column()
  name:string
  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[];
}
