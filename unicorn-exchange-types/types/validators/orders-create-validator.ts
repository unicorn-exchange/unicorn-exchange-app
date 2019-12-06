import {orderCommonFields, orderWriteFields} from "../enums/forms/order";
import * as yup from "yup";
import {CurrencyTypes} from "../enums/currency-types";

export const ordersCreateValidationScheme = {
  [orderWriteFields.countryId]: yup
    .number()
    .nullable()
    .required(),
  [orderCommonFields.currencySell]: yup
    .object()
    .shape({
      id: yup.number().required(),
      type: yup
        .string()
        .oneOf([CurrencyTypes.cryptoCurrency, CurrencyTypes.fiat])
        .required(),
    })
    .nullable()
    .required(),
  [orderCommonFields.currencySellPrice]: yup
    .number()
    .nullable()
    .required(),
  [orderCommonFields.currencyBuy]: yup
    .object()
    .shape({
      id: yup.number().required(),
      type: yup
        .string()
        .oneOf([CurrencyTypes.cryptoCurrency, CurrencyTypes.fiat])
        .required(),
    })
    .nullable()
    .required(),
  [orderCommonFields.currencyBuyPrice]: yup
    .string()
    .nullable()
    .required(),
  [orderWriteFields.paymentMethodId]: yup
    .number()
    .nullable()
    .required(),
  [orderCommonFields.bankName]: yup
    .string()
    .nullable()
    .required(),
  [orderCommonFields.marginProfit]: yup
    .number()
    .nullable()
    .required(),
  [orderCommonFields.isAutoAdjustTransactionLimit]: yup.boolean().nullable(),
  [orderCommonFields.termsOfTrade]: yup.string().nullable(),
  [orderCommonFields.isVerifiedUsersOnly]: yup.boolean().nullable(),
  [orderCommonFields.isTrustedUsersOnly]: yup.boolean().nullable(),
  [orderCommonFields.isIdentifyUsersBeforeContinueTrade]: yup.boolean().nullable(),
};
