import {Component, OnInit} from "@angular/core";
import {CommonStore} from "../../stores/common-store.service";
import {OrdersStore} from "../../stores/orders-store.service";
import {ROUTES} from "../../../config";
import {IPartOrderDTO} from "../../../../../unicorn-exchange-types/types/api/dtos";
import {BaseComponent} from "../base-component/base.component";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: "app-open-market-component",
  templateUrl: "./open-market.component.html",
  styleUrls: ["./open-market.component.scss"]
})
export class OpenMarketComponent extends BaseComponent implements OnInit {
  orders: IPartOrderDTO[];
  count: number;
  ROUTES = ROUTES;
  loadingCards = false;
  selectedCard: Array<number> = [];

  constructor(
    private commonStore: CommonStore,
    private ordersStore: OrdersStore,
  ) {
    super();
  }

  loadOrders = () => this.ordersStore.loadOrders();

  ngOnInit() {
    this.ordersStore.state$.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.orders = data.orders;
        this.count = data.count;
      });
    this.loadOrders();
  }

  reloadCards() {
    this.loadingCards = true;
    setTimeout(() => {
      this.loadingCards = false;
    }, 1500);
  }

}
