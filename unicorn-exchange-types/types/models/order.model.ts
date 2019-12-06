import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {UserModel} from "./user.model";
import {CountryModel} from "./country.model";
import {PaymentMethodModel} from "./payment-method.model";
import {orderCommonFields, orderReadFields, orderWriteFields} from "../enums/forms/order";
import {CryptoCurrencyModel} from "./crypto-currency.model";
import {FiatModel} from "./fiat.model";

@Table({modelName: "orders"})
export class OrderModel extends Model<OrderModel> {
  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.INTEGER,
    field: orderWriteFields.ownerId,
    comment: "User, who confirmed the order",
  })
  ownerId!: number;

  @BelongsTo(() => UserModel)
  owner!: UserModel;

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.INTEGER,
    field: orderReadFields.accepter,
    comment: "User, who accepted the order",
  })
  accepterId!: number;

  @BelongsTo(() => UserModel)
  accepter!: UserModel;

  @ForeignKey(() => CryptoCurrencyModel)
  @Column({
    type: DataType.INTEGER,
    field: orderWriteFields.cryptoCurrencyBuyId,
  })
  cryptoCurrencyBuyId!: number;

  @BelongsTo(() => CryptoCurrencyModel, "id")
  cryptoCurrencyBuy!: CryptoCurrencyModel;

  @ForeignKey(() => FiatModel)
  @Column({
    type: DataType.INTEGER,
    field: orderWriteFields.fiatBuyId,
  })
  fiatBuyId!: number;

  @BelongsTo(() => FiatModel, "id")
  fiatBuy!: FiatModel;

  @Column({
    type: DataType.INTEGER,
    field: orderCommonFields.currencyBuyPrice,
  })
  currencyBuyPrice!: number;

  @ForeignKey(() => CryptoCurrencyModel)
  @Column({
    type: DataType.INTEGER,
    field: orderWriteFields.cryptoCurrencySellId,
  })
  cryptoCurrencySellId!: number;

  @BelongsTo(() => CryptoCurrencyModel, "id")
  cryptoCurrencySell!: CryptoCurrencyModel;

  @ForeignKey(() => FiatModel)
  @Column({
    type: DataType.INTEGER,
    field: orderWriteFields.fiatSellId,
  })
  fiatSellId!: number;

  @BelongsTo(() => FiatModel, "id")
  fiatSell!: FiatModel;

  @Column({
    type: DataType.INTEGER,
    field: orderCommonFields.currencySellPrice,
  })
  currencySellPrice!: number;

  @ForeignKey(() => CountryModel)
  @Column({
    type: DataType.INTEGER,
    field: orderWriteFields.countryId,
  })
  countryId!: number;

  @BelongsTo(() => CountryModel)
  country!: CountryModel;

  @ForeignKey(() => PaymentMethodModel)
  @Column({
    type: DataType.INTEGER,
    field: orderWriteFields.paymentMethodId,
  })
  paymentMethodId!: number;

  @BelongsTo(() => PaymentMethodModel)
  paymentMethod!: PaymentMethodModel;

  @Column({
    type: DataType.INTEGER,
    field: orderCommonFields.bankName,
  })
  bankName!: string;

  @Column({
    type: DataType.INTEGER,
    field: orderCommonFields.marginProfit,
  })
  marginProfit!: number;

  @Column(DataType.BIGINT)
  buyAmount!: bigint;

  @Column(DataType.BIGINT)
  sellAmount!: bigint;

  @Column(DataType.FLOAT)
  exchangeRate!: number;

  @Column({
    type: DataType.BOOLEAN,
    field: orderCommonFields.isAutoAdjustTransactionLimit,
  })
  isAutoAdjustTransactionLimit!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    field: orderCommonFields.isVerifiedUsersOnly,
  })
  isVerifiedUsersOnly!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    field: orderCommonFields.isTrustedUsersOnly,
  })
  isTrustedUsersOnly!: boolean;

  @Column({
    type: DataType.STRING,
    field: orderCommonFields.termsOfTrade,
  })
  termsOfTrade!: string;

  @Column({
    type: DataType.BOOLEAN,
    field: orderCommonFields.isIdentifyUsersBeforeContinueTrade,
  })
  isIdentifyUsersBeforeContinueTrade!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isRequested!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isProcessing!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isPartial!: boolean;
}
