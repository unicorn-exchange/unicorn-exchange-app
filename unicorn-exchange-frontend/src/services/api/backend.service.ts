import {TypedAxiosInstance} from "restyped-axios";
import {APIV1Doc} from "../../../../unicorn-exchange-types/types/api/api-v1-doc";
import {Headers} from "../../../../unicorn-exchange-types/types/enums/enums";
import {Injectable} from "@angular/core";
import {APIV1} from "./api_v1";
import {ROUTES} from "../../config";
import {CommonStore} from "../../app/stores/common-store.service";
import {AlertType} from "../../app/components/alerts/alerts.enum";
import {KeyEnum} from "../db/key.enum";
import {DBService} from "../db/db.service";
import {Env} from "../../environments/env";
import {mockAPIV1Requests} from "./mock/api_v1_mock";
import {AxiosInstance} from "axios";

@Injectable({
  providedIn: "root"
})
export class BackendService {
  apiV1: TypedAxiosInstance<APIV1Doc>;

  constructor(
    private commonStore: CommonStore,
    private db: DBService,
  ) {
    this.apiV1 = new APIV1(Env.API_EXCHANGE_BASE_URL).axios;

    if (Env.FAKE_EXCHANGE_API) {
      mockAPIV1Requests(this.apiV1 as AxiosInstance);
    }

    this.apiV1.interceptors.request.use(this.onRequest, this.onRequestError);
    this.apiV1.interceptors.response.use(this.onResponse, this.onResponseError);

    this.setAuth(this.db.storage.get(KeyEnum.token));
  }

  private onRequest = (request) => {
    if (Env.DEBUG_NETWORK) {
      console.log("Request", request);
    }
    return request;
  }

  private onRequestError = (error: any) => {
    if (Env.DEBUG_NETWORK) {
      console.error("Request error", error);
    }
    return Promise.reject(error);
  }

  private onResponse = (response) => {
    if (Env.DEBUG_NETWORK) {
      console.log("Response:", response);
    }
    if (!response.data.ok) {
      return Promise.reject(response);
    }
    return response;
  }

  private onResponseError = (error: any) => {
    if (Env.DEBUG_NETWORK) {
      console.error("Response error:", error);
    }
    if (error.response.status === 401) {
      this.commonStore.redirectTo(ROUTES.SIGN_IN);
      this.commonStore.showAlert({
        type: AlertType.error,
        text: "Please sign in first!",
      });
    }
    return Promise.reject(error);
  }

  setAuth(token?: string) {
    if (!token) {
      delete this.apiV1.defaults.headers[Headers.Authorization];
      return;
    }
    this.apiV1.defaults.headers[Headers.Authorization] = `Bearer ${token}`;
  }
}
