import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {OrderModel} from "./order.model";
import {orderWriteFields} from "../enums/forms/order";

@Table({modelName: "crypto_currencies"})
export class CryptoCurrencyModel extends Model<CryptoCurrencyModel> {
  @Column(DataType.STRING)
  title!: string;

  @HasMany(() => OrderModel, orderWriteFields.cryptoCurrencyBuyId)
  ordersBuy!: OrderModel[];

  @HasMany(() => OrderModel, orderWriteFields.cryptoCurrencySellId)
  ordersSell!: OrderModel[];
}
