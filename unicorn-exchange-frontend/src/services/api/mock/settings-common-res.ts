import {ISettingsCommonRes} from "../../../../../unicorn-exchange-types/types/api/responses";

export const settingsCommonRes: ISettingsCommonRes = {
  ok: true,
  cryptoCurrencies: [{
    id: 1,
    title: "Bitcoin"
  }, {
    id: 2,
    title: "Ethereum"
  }],
  countries: [{
    id: 1,
    title: "Russia"
  }, {
    id: 2,
    title: "USA"
  }],
  fiats: [{
    id: 1,
    title: "Rubles"
  }, {
    id: 2,
    title: "Usd"
  }],
  paymentMethods: [{
    id: 1,
    title: "PayPal"
  }, {
    id: 2,
    title: "Card"
  }],
};
