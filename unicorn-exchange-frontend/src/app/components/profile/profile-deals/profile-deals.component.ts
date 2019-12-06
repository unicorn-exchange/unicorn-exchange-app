import {Component, OnInit} from "@angular/core";
import {IPartOrderDTO} from "../../../../../../unicorn-exchange-types/types/api/dtos";
import {ROUTES} from "../../../../config";
import {OrdersStore} from "../../../stores/orders-store.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {takeUntil} from "rxjs/operators";
import {BaseComponent} from "../../base-component/base.component";
import {AlertType} from "../../alerts/alerts.enum";
import {CommonStore} from "../../../stores/common-store.service";
import {OrderDeleteModalComponent} from "./order-delete-modal/order-delete-modal.component";

@Component({
  selector: "app-profile-deals-component",
  templateUrl: "./profile-deals.component.html",
  styleUrls: ["./profile-deals.component.scss"]
})
export class ProfileDealsComponent extends BaseComponent implements OnInit {
  orders: IPartOrderDTO[];
  ROUTES = ROUTES;
  count: number;

  constructor(
    private ordersStore: OrdersStore,
    private router: Router,
    private modalService: NgbModal,
    private commonStore: CommonStore,
  ) {
    super();
  }

  ngOnInit() {
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

  declineOrder(orderId) {
    const modalRef = this.modalService.open(OrderDeleteModalComponent, {size: "lg"});
    modalRef.componentInstance.orderId = orderId;
  }
}
