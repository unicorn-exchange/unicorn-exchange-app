import {Component, Input, OnInit} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BaseComponent} from "../../../base-component/base.component";
import {OrdersStore} from "../../../../stores/orders-store.service";
import {ROUTES} from "../../../../../config";
import {Router} from "@angular/router";
import {AlertType} from "../../../alerts/alerts.enum";
import {CommonStore} from "../../../../stores/common-store.service";

@Component({
  selector: "app-order-decline-modal-content",
  templateUrl: "./order-delete-modal.component.html",
  styleUrls: ["./order-delete-modal.component.scss"]
})
export class OrderDeleteModalComponent extends BaseComponent implements OnInit {
  @Input() orderId;

  constructor(
    public activeModal: NgbActiveModal,
    private ordersStore: OrdersStore,
    private commonStore: CommonStore,
    private router: Router,
  ) {
    super();
  }

  ngOnInit() {
  }

  declineOrder = () => {
    this.ordersStore
      .declineOrder(this.orderId)
      .catch(() => {
        this.commonStore.showAlert({
          text: "Error while deleting order",
          type: AlertType.error
        });
      })
      .finally(() => {
        this.commonStore.showAlert({
          text: "Order deleted",
          type: AlertType.success
        });
        this.router.navigate([ROUTES.ORDERS]);
      });

    this.router.navigate([ROUTES.ORDERS]);
    this.activeModal.dismiss("Cross click");
  }
}
