import {Injectable} from "@angular/core";
import {BackendService} from "../../services/api/backend.service";
import {IOrderWriteDTO, IPartOrderDTO} from "../../../../unicorn-exchange-types/types/api/dtos";
import {BehaviorSubject} from "rxjs";
import {
  ORDERS_CONFIRM,
  ORDERS_CREATE,
  ORDERS_DECLINE,
  ORDERS_GET_ALL,
  ORDERS_GET_ONE
} from "../../../../unicorn-exchange-types/types/api/api-v1-doc";

interface IStoreState {
  orders: IPartOrderDTO[];
  count: number;
}

@Injectable({
  providedIn: "root"
})
export class OrdersStore {
  state$: BehaviorSubject<IStoreState> = new BehaviorSubject<IStoreState>({
    orders: [],
    count: 0,
  });

  constructor(
    private backend: BackendService
  ) {
  }

  loadOrders() {
    return this.backend.apiV1
      .get(ORDERS_GET_ALL)
      .then(res => {
        this.state$.next({
          count: res.data.count,
          orders: res.data.payload,
        });
        return res.data;
      })
      .catch(err => {
        this.state$.next({
          count: 0,
          orders: [],
        });
        throw err;
      });
  }

  // loadOrders(params: IOrderWriteDTO) {
  //   return this.backend.apiV1
  //     .get(ORDERS_GET_ALL, params)
  //     .then(res => {
  //       this.state$.next({
  //         count: res.data.count,
  //         orders: res.data.payload,
  //       });
  //       return res.data;
  //     })
  //     .catch(err => {
  //       this.state$.next({
  //         count: 0,
  //         orders: [],
  //       });
  //       throw err;
  //     });
  // }

  createOrder(params: IOrderWriteDTO) {
    return this.backend.apiV1
      .post(ORDERS_CREATE, params)
      .then(res => {
        return res.data;
      });
  }

  getOrder(id) {
    return this.backend.apiV1
      .get(ORDERS_GET_ONE, id)
      .then(res => {
        return res.data;
      });
  }

  confirmOrder(id) {
    return this.backend.apiV1
      .post(ORDERS_CONFIRM, id)
      .then(res => {
        return res.data;
      });
  }

  declineOrder(id) {
    return this.backend.apiV1
      .post(ORDERS_DECLINE, id)
      .then(res => {
        return res.data;
      });
  }
}
