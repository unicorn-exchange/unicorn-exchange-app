import axios, {TypedAxiosInstance} from "restyped-axios";
import {APIV1Doc} from "../../../../unicorn-exchange-types/types/api/api-v1-doc";

export class APIV1 {
  axios: TypedAxiosInstance<APIV1Doc>;

  constructor(baseURL: string, headers: {} = {}) {
      this.axios = axios.create<APIV1Doc>({baseURL, headers});
  }
}
