import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommonStore} from "../../stores/common-store.service";
import {OrdersStore} from "../../stores/orders-store.service";
import {ROUTES} from "../../../config";
import {IPartOrderDTO} from "../../../../../unicorn-exchange-types/types/api/dtos";
import {orderCommonFields, orderWriteFields} from "../../../../../unicorn-exchange-types/types/enums/forms/order";
import {BaseComponent} from "../base-component/base.component";
import {takeUntil} from "rxjs/operators";
import {AlertType} from "../alerts/alerts.enum";
import {IAppSettings, SettingsStore} from "../../stores/settings-store.service";
import {OrderDeclineModalComponent} from "../processing/order-decline-modal/order-decline-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";


@Component({
  selector: "app-orders-component",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"]
})
export class OrdersComponent extends BaseComponent implements OnInit {
  orderFilersFields = orderWriteFields;
  orderCommonFields = orderCommonFields;
  filersForm: FormGroup = this.fb.group({
    [orderCommonFields.currencySell]: [null, [Validators.required]],
    [orderCommonFields.currencyBuy]: [null, [Validators.required]],
    [orderWriteFields.countryId]: [null, [Validators.required]],
    [orderWriteFields.paymentMethodId]: [null, [Validators.required]],
  });
  settings: IAppSettings;
  orders: IPartOrderDTO[];
  count: number;
  ROUTES = ROUTES;

  constructor(
    private fb: FormBuilder,
    private commonStore: CommonStore,
    private settingsStore: SettingsStore,
    private ordersStore: OrdersStore,
    private modalService: NgbModal,
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
    this.ordersStore.state$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.orders = data.orders;
        this.count = data.count;
      });
    this.loadOrders();
  }

  loadOrders() {
    this.ordersStore
      .loadOrders()
      .catch(() => {
        this.commonStore.showAlert({
          text: "Error while loading orders",
          type: AlertType.error
        });
      });
  }

  confirmOrder(orderId) {
    this.ordersStore
      .confirmOrder(orderId)
      .catch(() => {
        this.commonStore.showAlert({
          text: "Error while confirming order",
          type: AlertType.error
        });
      })
      .finally(() => {
        this.router.navigate([`${ROUTES.ORDER}/${orderId}/${ROUTES.PROCESSING}`]);
      });
  }

  declineOrder(orderId) {
    const modalRef = this.modalService.open(OrderDeclineModalComponent, {size: "lg"});
    modalRef.componentInstance.orderId = orderId;
  }

  onSubmit(event, formData) {
    event.preventDefault();

    this.ordersStore
      .loadOrders()
      .then(() => {
        this.router.navigate([ROUTES.ORDERS], {
          queryParams: {
            country: formData.countryId,
            paymentMethod: formData.paymentMethodId,
          }
        });
      })
      .catch(() => {
        this.commonStore.showAlert({
          text: "Error while loading orders",
          type: AlertType.error
        });
      });
  }
}
