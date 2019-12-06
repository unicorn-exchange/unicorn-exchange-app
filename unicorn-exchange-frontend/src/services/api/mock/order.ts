import {IFullOrderDTO} from "../../../../../unicorn-exchange-types/types/api/dtos";
import {orderCommonFields, orderReadFields} from "../../../../../unicorn-exchange-types/types/enums/forms/order";
import {user} from "./user";
import {CurrencyTypes} from "../../../../../unicorn-exchange-types/types/enums/currency-types";

export const order: IFullOrderDTO = {
  [orderReadFields.country]: {
    id: 1,
    title: "Russia"
  },
  [orderCommonFields.currencySell]: {
    id: 1,
    title: "BTC",
    type: CurrencyTypes.cryptoCurrency,
  },
  [orderCommonFields.currencyBuy]: {
    id: 1,
    title: "USD",
    type: CurrencyTypes.fiat,
  },
  [orderReadFields.paymentMethod]: {
    id: 1,
    title: "Pay Pall"
  },
  [orderReadFields.owner]: user,
  [orderCommonFields.currencySellPrice]: 1,
  [orderCommonFields.currencyBuyPrice]: 3187422,
  [orderCommonFields.bankName]: "bank",
  [orderCommonFields.marginProfit]: 1,
  [orderCommonFields.termsOfTrade]: "terms",
  [orderCommonFields.isAutoAdjustTransactionLimit]: true,
  [orderCommonFields.isVerifiedUsersOnly]: true,
  [orderCommonFields.isTrustedUsersOnly]: true,
  [orderCommonFields.isIdentifyUsersBeforeContinueTrade]: true,
};
