import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {UserModel} from "./user.model";
import {CryptoCurrencyModel} from "./crypto-currency.model";

@Table({modelName: "crypto_accounts"})
export class CryptoAccountModel extends Model<CryptoAccountModel> {
  @ForeignKey(() => CryptoCurrencyModel)
  @Column(DataType.INTEGER)
  cryptoCurrencyId!: number;

  @Column(DataType.BOOLEAN)
  isActive!: boolean;

  @ForeignKey(() => UserModel)
  @Column(DataType.INTEGER)
  userId!: number;
}
