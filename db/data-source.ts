import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions:DataSourceOptions={
  type:"postgres",
  host: "ep-morning-hall-a1968o7x-pooler.ap-southeast-1.aws.neon.tech",
  port:5432,
  username: "nestjs_owner",
  password: "VxW6gRtj4OXb",
  database: "nestOrm",
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations:['dist/db/migrations/*{.ts,.js}'],
  logging:false,
  synchronize: true,
  ssl:true
}
const dataSource=new DataSource(dataSourceOptions);
export default dataSource

