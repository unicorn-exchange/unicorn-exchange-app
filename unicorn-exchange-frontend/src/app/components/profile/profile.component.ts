import {Component, Input, OnInit} from "@angular/core";
import {ROUTES} from "../../../config";
import {TranslateService} from "@ngstack/translate";

@Component({
  selector: "app-profile-component",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  ROUTES = ROUTES;
  @Input() showRoute: string;
  navElements = [
    {
      routerLink: ROUTES.PROFILE.INFO,
      label: this.translate.get("PROFILE.INFO")
    },
    {
      routerLink: ROUTES.PROFILE.DEALS,
      label: this.translate.get("PROFILE.DEALS")
    },
    {
      routerLink: ROUTES.PROFILE.CHANGE_PASSWORD,
      label: this.translate.get("PROFILE.PASSWORD")
    }
  ];

  constructor(private translate: TranslateService) {
  }

  ngOnInit() {
  }

  isActive(route) {
    return window.location.pathname.split("/")[2] === route || this.showRoute === route;
  }
}
