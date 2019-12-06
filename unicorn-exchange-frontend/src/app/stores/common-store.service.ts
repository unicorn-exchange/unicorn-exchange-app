import {Subject} from "rxjs";
import {Injectable} from "@angular/core";
import {AlertType} from "../components/alerts/alerts.enum";
import {Router} from "@angular/router";

export interface IGlobalAlert {
  text: string;
  type: AlertType;
}

export interface IGlobalNotification {
  text: string;
}

@Injectable({
  providedIn: "root"
})
export class CommonStore {
  globalAlert$ = new Subject<IGlobalAlert>();
  globalNotification$ = new Subject<IGlobalNotification>();

  constructor(
    private router: Router,
  ) {
  }

  showAlert(params: IGlobalAlert) {
    this.globalAlert$.next(params);
  }

  showNotification(params: IGlobalNotification) {
    this.globalNotification$.next(params);
  }

  showCommonError(err?: string) {
    this.showAlert({
      type: AlertType.error,
      text: err || "Error occurred",
    });
  }

  redirectTo(route: string) {
    this.router.navigate([route]);
  }
}
