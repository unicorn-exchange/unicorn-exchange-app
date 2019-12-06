import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {OrdersStore} from "../../stores/orders-store.service";
import {ROUTES} from "../../../config";
import {BaseComponent} from "../base-component/base.component";
import {takeUntil} from "rxjs/operators";
import {IFullOrderDTO} from "../../../../../unicorn-exchange-types/types/api/dtos";
import {CommonStore} from "../../stores/common-store.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {IAppSettings, SettingsStore} from "../../stores/settings-store.service";
import {OrderDeclineModalComponent} from "../processing/order-decline-modal/order-decline-modal.component";
import {OrderCompleteModalComponent} from "./order-complete-modal/order-complete-modal.component";

@Component({
  selector: "app-order-processing-component",
  templateUrl: "./owner-processing.component.html",
  styleUrls: ["./owner-processing.component.scss"]
})
export class OwnerProcessingComponent extends BaseComponent implements OnInit {
  order: IFullOrderDTO;
  settings: IAppSettings;
  ROUTES = ROUTES;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ordersStore: OrdersStore,
    private commonStore: CommonStore,
    private settingsStore: SettingsStore,
    private modalService: NgbModal,
  ) {
    super();
  }

  ngOnInit() {
    this.settingsStore.settings$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.settings = data;
      });
    this.route.paramMap
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(params => {
        this.state.isLoading = true;
        this.ordersStore
          .getOrder(params.get("id"))
          .then(res => {
            this.order = res.payload;
          })
          .catch(err => {
            console.error(err);
          })
          .finally(() => {
            this.state.isLoading = false;
          });
      });
  }

  completeOrder() {
    const modalRef = this.modalService.open(OrderCompleteModalComponent, {size: "lg"});
    modalRef.componentInstance.orderId = this.order.id;
  }

  declineOrder() {
    const modalRef = this.modalService.open(OrderDeclineModalComponent, {size: "lg"});
    modalRef.componentInstance.orderId = this.order.id;
  }
}
