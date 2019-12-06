import {ISettingsCommonRes} from "../../../../unicorn-exchange-types/types/api/responses";
import {BehaviorSubject} from "rxjs";
import {Injectable} from "@angular/core";
import {BackendService} from "../../services/api/backend.service";
import {ICurrencyDTO} from "../../../../unicorn-exchange-types/types/api/dtos";
import {CurrencyTypes} from "../../../../unicorn-exchange-types/types/enums/currency-types";

export interface IAppSettings extends Partial<ISettingsCommonRes> {
  currencies: ICurrencyDTO[];
  maxRating: number;
}

const MAX_RATING = 5;

@Injectable({
  providedIn: "root"
})
export class SettingsStore {
  settings$: BehaviorSubject<IAppSettings> = new BehaviorSubject<IAppSettings>({
    currencies: [],
    countries: [],
    paymentMethods: [],
    maxRating: MAX_RATING,
  });

  constructor(
    private backend: BackendService,
  ) {
    this.onInit();
  }

  onInit() {
    this.backend.apiV1.get("/settings/common").then(res => {
      const arr = res.data.cryptoCurrencies
        .map(i => {
          (i as ICurrencyDTO).type = CurrencyTypes.cryptoCurrency;
          return i;
        })
        .concat(res.data.fiats.map(i => {
          (i as ICurrencyDTO).type = CurrencyTypes.fiat;
          return i;
        })) as ICurrencyDTO[];
      this.settings$.next({
        currencies: arr,
        countries: res.data.countries,
        paymentMethods: res.data.paymentMethods,
        maxRating: MAX_RATING,
      });
    });
  }
}
