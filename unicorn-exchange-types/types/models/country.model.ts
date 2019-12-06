import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {OrderModel} from "./order.model";

@Table({modelName: "countries"})
export class CountryModel extends Model<CountryModel> {
  @Column(DataType.STRING)
  title!: string;

  @HasMany(() => OrderModel)
  orders!: OrderModel[];
}
