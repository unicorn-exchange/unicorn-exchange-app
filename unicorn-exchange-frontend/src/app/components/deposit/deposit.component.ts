import {Component, OnDestroy, OnInit} from "@angular/core";
import {ordersCreateValidationScheme} from "../../../../../unicorn-exchange-types/types/validators/orders-create-validator";
import {FormBuilder, FormGroup} from "@angular/forms";
import {genCtrl} from "../../../services/utils";
import {CommonStore} from "../../stores/common-store.service";
import {OrdersStore} from "../../stores/orders-store.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DepositModalComponent} from "./deposit-modal/deposit-modal.component";
import {orderCommonFields} from "../../../../../unicorn-exchange-types/types/enums/forms/order";
import {IAppSettings, SettingsStore} from "../../stores/settings-store.service";
import {BaseComponent} from "../base-component/base.component";

@Component({
  selector: "app-deposit-component",
  templateUrl: "./deposit.component.html",
  styleUrls: ["./deposit.component.scss"]
})
export class DepositComponent extends BaseComponent implements OnInit, OnDestroy {
  scheme = ordersCreateValidationScheme;
  orderCommonFields = orderCommonFields;
  submitted = false;
  settings: IAppSettings;
  form: FormGroup = this.fb.group(Object.assign(
    genCtrl({key: orderCommonFields.currencyBuy, scheme: this.scheme}),
  ));
  deposits = [
    {
      id: 1,
      amount: 1,
      cryptoCurrency: "BTC",
      netAmount: 1234,
      address: "38ZLH3BapsAPgc2HW1EBf194vnpdeCTJix",
      status: "Success",
      timeCreate: "1 Oct, 9:40"
    }
  ];

  constructor(
    private fb: FormBuilder,
    private commonStore: CommonStore,
    private settingsStore: SettingsStore,
    private ordersStore: OrdersStore,
    private modalService: NgbModal
  ) {
    super();
  }

  ngOnInit() {
    this.settingsStore.settings$.subscribe(data => {
      this.settings = data;
    });
  }

  onSubmit(event, formData) {
    this.submitted = true;
    event.preventDefault();
    if (this.form.invalid) {
      return;
    }

    const modalRef = this.modalService.open(DepositModalComponent, {size: "lg"});
    modalRef.componentInstance.name = "World";

    // this.ordersStore
    //   .createOrder(formData)
    //   .then(() => this.alertType.next("success"))
    //   .catch(err => {
    //     console.log(err);
    //   });
  }
}
