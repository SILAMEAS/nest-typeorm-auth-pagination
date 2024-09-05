import { DataSource, DataSourceOptions } from "typeorm";
import 'dotenv/config';
import * as process from 'process';
export const dataSourceOptions:DataSourceOptions={
  type:"postgres",
  host: process.env.DB_HOST,
  port:+process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // development
  // entities: ['dist/**/*.entity.ts'],
  // production
  entities: ['dist/**/*.entity.js'],
  migrations:['dist/db/migrations/*{.ts,.js}'],
  logging:false,
  synchronize: false,
  ssl:true
}
const dataSource=new DataSource(dataSourceOptions);
export default dataSource

