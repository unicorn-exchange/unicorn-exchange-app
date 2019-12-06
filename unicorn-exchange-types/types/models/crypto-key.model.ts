import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {CryptoAccountModel} from "./crypto-account.model";

@Table({modelName: "crypto_keys"})
export class CryptoKeyModel extends Model<CryptoKeyModel> {
  @Column(DataType.STRING)
  publicKey!: string;

  @Column(DataType.STRING)
  privateKey!: string;

  @Column(DataType.STRING)
  ERC20!: string;

  @Column(DataType.BOOLEAN)
  isDefault!: boolean;

  @Column(DataType.STRING)
  isCustomKey!: string;

  @ForeignKey(() => CryptoAccountModel)
  @Column(DataType.INTEGER)
  cryptoAccountId!: number;
}
