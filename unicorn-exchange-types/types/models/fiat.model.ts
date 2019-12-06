import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {OrderModel} from "./order.model";
import {orderWriteFields} from "../enums/forms/order";

@Table({modelName: "fiats"})
export class FiatModel extends Model<FiatModel> {
  @Column(DataType.STRING)
  title!: string;

  @HasMany(() => OrderModel, orderWriteFields.fiatBuyId)
  ordersBuy!: OrderModel[];

  @HasMany(() => OrderModel, orderWriteFields.fiatSellId)
  ordersSell!: OrderModel[];
}
