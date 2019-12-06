import {Column, DataType, HasMany, Model, Table, Unique} from "sequelize-typescript";
import {OrderModel} from "./order.model";

@Table({modelName: "users"})
export class UserModel extends Model<UserModel> {
  @Unique
  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.STRING)
  password!: string;

  @Column(DataType.STRING)
  salt!: string;

  @Unique
  @Column(DataType.STRING)
  username!: string;

  @HasMany(() => OrderModel)
  orders!: OrderModel[];
}
