import { AbstractEntity } from "../../utils/abstract/AbstractEntity";
import { Column, Entity, ManyToOne } from "typeorm";
import { CategoryEntity } from "../../category/entities/category.entity";

@Entity('products')
export class ProductEntity extends AbstractEntity{
  @Column()
  name:string
  @Column({type:'decimal',default:0})
  qty:number
  @Column({type:'decimal',default:0.00})
  price:number
  @ManyToOne(() => CategoryEntity, (category) => category.products)
  category: CategoryEntity;
}
