import {Component, OnInit} from "@angular/core";
import {ROUTES} from "../../../config";

@Component({
  selector: "app-footer-component",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"]
})
export class FooterComponent implements OnInit {

  ROUTES = ROUTES;

  constructor() {
  }

  ngOnInit() {
  }
}
