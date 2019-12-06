import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {OrderModel} from "./order.model";

@Table({modelName: "payment_methods"})
export class PaymentMethodModel extends Model<PaymentMethodModel> {
  @Column(DataType.STRING)
  title!: string;

  @HasMany(() => OrderModel)
  orders!: OrderModel[];
}
