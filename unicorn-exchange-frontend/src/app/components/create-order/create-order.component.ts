import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {CommonStore} from "../../stores/common-store.service";
import {ordersCreateValidationScheme} from "../../../../../unicorn-exchange-types/types/validators/orders-create-validator";
import {genCtrl} from "../../../services/utils";
import {OrdersStore} from "../../stores/orders-store.service";
import {orderCommonFields, orderWriteFields} from "../../../../../unicorn-exchange-types/types/enums/forms/order";
import {AlertType} from "../alerts/alerts.enum";
import {IAppSettings, SettingsStore} from "../../stores/settings-store.service";
import {BaseComponent} from "../base-component/base.component";
import {takeUntil} from "rxjs/operators";
import {Router} from "@angular/router";
import {ROUTES} from "../../../config";

@Component({
  selector: "app-create-order-component",
  templateUrl: "./create-order.component.html",
  styleUrls: ["./create-order.component.scss"],
})
export class CreateOrderComponent extends BaseComponent implements OnInit, OnDestroy {
  scheme = ordersCreateValidationScheme;
  orderWriteFields = orderWriteFields;
  orderCommonFields = orderCommonFields;
  submitted = false;
  settings: IAppSettings;
  ROUTES = ROUTES;
  formSubscription: Subscription;
  form: FormGroup = this.fb.group(Object.assign(
    genCtrl({key: orderWriteFields.countryId, scheme: this.scheme}),
    genCtrl({key: orderCommonFields.currencySell, scheme: this.scheme}),
    genCtrl({key: orderCommonFields.currencySellPrice, scheme: this.scheme}),
    genCtrl({key: orderCommonFields.currencyBuy, scheme: this.scheme}),
    genCtrl({key: orderCommonFields.currencyBuyPrice, scheme: this.scheme}),
    genCtrl({key: orderWriteFields.paymentMethodId, scheme: this.scheme}),
    genCtrl({key: orderCommonFields.bankName, scheme: this.scheme}),
    genCtrl({key: orderCommonFields.marginProfit, scheme: this.scheme}),
    genCtrl({key: orderCommonFields.isAutoAdjustTransactionLimit, scheme: this.scheme}),
    genCtrl({key: orderCommonFields.termsOfTrade, scheme: this.scheme}),
    genCtrl({key: orderCommonFields.isVerifiedUsersOnly, scheme: this.scheme}),
    genCtrl({key: orderCommonFields.isTrustedUsersOnly, scheme: this.scheme}),
    genCtrl({key: orderCommonFields.isIdentifyUsersBeforeContinueTrade, scheme: this.scheme})
  ));

  constructor(
    private fb: FormBuilder,
    private commonStore: CommonStore,
    private settingsStore: SettingsStore,
    private ordersStore: OrdersStore,
    private router: Router,
  ) {
    super();
  }

  ngOnInit() {
    this.settingsStore.settings$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.settings = data;
      });
    this.formSubscription = this.form.valueChanges.subscribe(v => {
      console.log(v);
    });
  }

  changeCurrencies(form) {
    this.form.patchValue({
      currencySell: form.currencyBuy,
      currencyBuy: form.currencySell,
      currencyBuyPrice: form.currencySellPrice,
      currencySellPrice: form.currencyBuyPrice,
    });
  }

  onSubmit(event, formData) {
    this.submitted = true;
    event.preventDefault();
    if (this.form.invalid) {
      return this.commonStore.showAlert({
        text: "Please check the form",
        type: AlertType.warning
      });
    }

    this.ordersStore
      .createOrder(formData)
      .then()
      .catch(err => {
        console.error(err);
        this.commonStore.showAlert({
          text: "Failed to create order. Please, try again later",
          type: AlertType.error
        });
      })
      .finally(() => {
        this.commonStore.showAlert({
          text: "Order created!",
          type: AlertType.success
        });
        this.router.navigate([ROUTES.ORDERS]);
      });
  }
}
