import {ISettingsCommonRes} from "../../../../../../unicorn-exchange-types/types/api/responses";
import {CountryModel} from "../../../../../../unicorn-exchange-types/types/models/country.model";
import {CryptoCurrencyModel} from "../../../../../../unicorn-exchange-types/types/models/crypto-currency.model";
import {PaymentMethodModel} from "../../../../../../unicorn-exchange-types/types/models/payment-method.model";
import {FiatModel} from "../../../../../../unicorn-exchange-types/types/models/fiat.model";

export function settingsCommonCtr(): Promise<ISettingsCommonRes> {
  return Promise.props({
    countries: CountryModel.findAll(),
    fiats: FiatModel.findAll(),
    cryptoCurrencies: CryptoCurrencyModel.findAll(),
    paymentMethods: PaymentMethodModel.findAll(),
  }).then(props => {
    const {paymentMethods, countries, cryptoCurrencies, fiats} = props as ISettingsCommonRes;
    // TODO: check if we need for toJSON()
    if (!paymentMethods || !countries || !cryptoCurrencies || !fiats) {
      throw new Error("Settings error");
    }
    // TODO: Check types
    return {
      ok: true,
      countries,
      cryptoCurrencies,
      paymentMethods,
      fiats,
    };
  });
}
