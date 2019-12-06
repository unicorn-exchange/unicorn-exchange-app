export enum orderCommonFields {
  currencySellPrice = "currencySellPrice",
  currencyBuyPrice = "currencyBuyPrice",
  bankName = "bankName",
  marginProfit = "marginProfit",
  isAutoAdjustTransactionLimit = "isAutoAdjustTransactionLimit",
  termsOfTrade = "termsOfTrade",
  isVerifiedUsersOnly = "isVerifiedUsersOnly",
  isTrustedUsersOnly = "isTrustedUsersOnly",
  isIdentifyUsersBeforeContinueTrade = "isIdentifyUsersBeforeContinueTrade",
  currencySell = "currencySell",
  currencyBuy = "currencyBuy",
}

export enum orderWriteFields {
  ownerId = "ownerId",
  countryId = "countryId",
  paymentMethodId = "paymentMethodId",
  cryptoCurrencySellId = "cryptoCurrencySellId",
  fiatSellId = "fiatSellId",
  cryptoCurrencyBuyId = "cryptoCurrencyBuyId",
  fiatBuyId = "fiatBuyId",
}

export enum orderReadFields {
  accepter = "accepter",
  owner = "owner",
  country = "country",
  paymentMethod = "paymentMethod",
  cryptoCurrencySell = "cryptoCurrencySell",
  cryptoCurrencyBuy = "cryptoCurrencyBuy",
  fiatSell = "fiatSell",
  fiatBuy = "fiatBuy",
}
