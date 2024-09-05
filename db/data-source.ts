import { DataSource, DataSourceOptions } from "typeorm";
import 'dotenv/config';
import * as process from 'process';
import { CategoryEntity } from "../src/category/entities/category.entity";
import { UserEntity } from "../src/users/entities/user.entity";
import { ProductEntity } from "../src/product/entities/product.entity";
export const dataSourceOptions:DataSourceOptions={
  type:"postgres",
  host: process.env.DB_HOST,
  port:+process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [UserEntity,CategoryEntity,ProductEntity],
  migrations:['dist/db/migrations/*{.ts,.js}'],
  logging:true,
  // synchronize:true
  synchronize: false,
  ssl:true
}
const dataSource=new DataSource(dataSourceOptions);
export default dataSource

