import axios, {TypedAxiosInstance} from "restyped-axios";
import {APIV1Doc} from "../../../../unicorn-exchange-types/types/api/api-v1-doc";
import {mockAPIV1Requests} from "./mock/api_v1_mock";
import {AxiosInstance} from "axios";
import axiosCancel from "axios-cancel";
import {Env} from "../../environments/env";

axiosCancel(axios);

export class APIV1 {
  axios: TypedAxiosInstance<APIV1Doc>;

  constructor(baseURL: string, headers: {} = {}) {
    this.axios = axios.create<APIV1Doc>({
      baseURL,
      headers,
    });
    if (Env.FAKE_NETWORK) {
      mockAPIV1Requests(this.axios as AxiosInstance);
    }
  }
}
