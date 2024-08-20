import { Exclude } from "class-transformer";
import { CreateDateColumn, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn()
  @Exclude()
  public id: number;
  @CreateDateColumn()
  @Exclude()
  createdAt:Timestamp
  @UpdateDateColumn()
  @Exclude()
  updatedAt:Timestamp
}