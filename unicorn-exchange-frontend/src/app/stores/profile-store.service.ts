import {Injectable} from "@angular/core";
import {BackendService} from "../../services/api/backend.service";
import {ICommonRes} from "../../../../unicorn-exchange-types/types/api/responses";
import {defaultResponse} from "../../services/api/mock/default_response";


export interface IProfileChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface IChangePasswordReq {
  oldPassword: string;
  newPassword: string;
}

@Injectable({
  providedIn: "root"
})
export class ProfileStore {
  constructor(
    private backend: BackendService
  ) {
  }

  async changePassword(params: IChangePasswordReq): Promise<ICommonRes> {
    return defaultResponse;
  }

  profileChangePassword(params: IProfileChangePassword) {
    return this.changePassword(params)
      .then(res => {
        return res;
      });
  }
}
