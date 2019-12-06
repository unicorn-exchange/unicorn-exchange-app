import {Component, OnInit} from "@angular/core";
import {NgbAlertConfig} from "@ng-bootstrap/ng-bootstrap";
import {debounceTime, takeUntil} from "rxjs/operators";
import {CommonStore, IGlobalAlert} from "../../stores/common-store.service";
import {BaseComponent} from "../base-component/base.component";

const DEBOUNCE_TIME_LONG = 3000;
const DEBOUNCE_TIME_SHORT = 2500;

@Component({
  selector: "app-alert-component",
  templateUrl: "./alerts.component.html",
  styleUrls: ["./alerts.component.scss"],
  providers: [NgbAlertConfig]
})
export class AlertsComponent extends BaseComponent implements OnInit {
  notification: IGlobalAlert;
  closeAnimation: boolean;

  constructor(
    private alertConfig: NgbAlertConfig,
    private commonStore: CommonStore,
  ) {
    super();
    alertConfig.dismissible = false;
  }

  ngOnInit() {
    this.commonStore.globalAlert$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(params => {
        this.notification = params;
        this.closeAnimation = false;
        this.alertConfig.type = params.type;
      });
    this.commonStore.globalAlert$
      .pipe(debounceTime(DEBOUNCE_TIME_LONG))
      .subscribe(() => {
        this.notification = null;
      });
    this.commonStore.globalAlert$
      .pipe(debounceTime(DEBOUNCE_TIME_SHORT))
      .subscribe(() => {
        this.closeAnimation = true;
      });
  }
}
