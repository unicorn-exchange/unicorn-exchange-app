import {Component, Input, OnInit} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BaseComponent} from "../../base-component/base.component";
import {OrdersStore} from "../../../stores/orders-store.service";
import {CommonStore} from "../../../stores/common-store.service";
import {AlertType} from "../../alerts/alerts.enum";
import {ChatStore} from "../../../stores/chat-store.service";

@Component({
  selector: "app-order-pay-modal-content",
  templateUrl: "./order-pay-modal.component.html",
  styleUrls: ["./order-pay-modal.component.scss"]
})
export class OrderPayModalComponent extends BaseComponent implements OnInit {
  @Input() orderId;

  constructor(
    private activeModal: NgbActiveModal,
    private ordersStore: OrdersStore,
    private commonStore: CommonStore,
    private chatStore: ChatStore,
  ) {
    super();
  }

  ngOnInit() {
  }

  confirmOrder() {
    this.activeModal.dismiss("Cross click");
    this.ordersStore
      .confirmOrder(this.orderId)
      .catch(() => {
        this.commonStore.showAlert({
          type: AlertType.error,
          text: "Error while confirming order",
        });
      })
      .finally(() => {
        this.commonStore.showAlert({
          type: AlertType.success,
          text: "Request has been sent",
        });
        this.chatStore.sendMessage({
          text: "Payment was successful.",
          reply: false,
          state: "sending",
          user: {
            name: "Kate Moss",
            avatar: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
          },
        });
      });
  }
}
