import {Component, OnInit} from "@angular/core";
import {ROUTES} from "../../../config";

@Component({
  selector: "app-header-component",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {

  showSideBar = false;
  ROUTES = ROUTES;

  constructor() {
  }

  ngOnInit() {
  }

  toggleSideBar() {
    this.showSideBar = !this.showSideBar;
  }
}
